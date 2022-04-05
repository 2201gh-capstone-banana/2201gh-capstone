const router = require('express').Router()
const { requireToken } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, TargetWord }
} = require('../db')
module.exports = router

const getRandomIdx = max => {
	return Math.floor(Math.random() * max)
}

router.get('/game', requireToken, async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized')
		}
		let previousGuessesArr, targetWord
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.user.id },
			include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt', 'DESC']]
		})
		if (latestWordle) {
			previousGuessesArr = latestWordle.acceptedGuesses.map(guess => {
				return guess.content.toUpperCase()
			})
			targetWord = latestWordle.targetWord.content.toUpperCase()
		}
		if (
			!latestWordle ||
			latestWordle.acceptedGuesses.length === 6 ||
			previousGuessesArr.includes(targetWord)
		) {
			const targetWordList = await TargetWord.findAll({
				attributes: ['content']
			})
			targetWord = await TargetWord.findByPk(getRandomIdx(targetWordList.length))

			const newWordleGame = await WordleGame.create({
				targetWordId: targetWord.id,
				userId: req.user.id
			})
			const returnNewWordleGame = await WordleGame.findOne({
				where: { id: newWordleGame.id },
				include: [{ model: AcceptedGuess }, { model: TargetWord }],
				order: [['createdAt', 'DESC']]
			})
			res.json(returnNewWordleGame)
		} else {
			res.json(latestWordle)
		}
	} catch (error) {
		console.log('Error in your post new game route')
		next(error)
	}
})

router.post('/addGuess', requireToken, async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized')
		}

		const latestWordle = await WordleGame.findOne({
			where: { userId: req.user.id },
			order: [['createdAt', 'DESC']],
			include: TargetWord
		})
		const newAcceptedGuess = await AcceptedGuess.create({
			wordleGameId: latestWordle.id,
			content: req.body.content
		})
		const allAcceptedGuesses = await AcceptedGuess.findAll({
			where: {
				wordleGameId: latestWordle.id
			}
		})
		const allguessArr = allAcceptedGuesses.map(ele => ele.content)

		if (allguessArr.includes(latestWordle.targetWord.content)) {
			await latestWordle.update({ ...latestWordle, status: 1 })
		} else if (
			allguessArr.length === 6 &&
			!allguessArr.includes(latestWordle.targetWord.content)
		) {
			await latestWordle.update({ ...latestWordle, status: 0 })
		}

		res.json(newAcceptedGuess)
	} catch (error) {
		console.log('Error in your post new guess route')
		next(error)
	}
})

router.get('/stats', requireToken, async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized')
		}
		const allWordle = await WordleGame.findAll({
			where: { userId: req.user.id },
			order: [['createdAt']],
			include: TargetWord
		})
		const allWordleStatus = allWordle
			.map(ele => ele.status)
			.filter(ele => ele !== null)
		// null: inprogress, 0: lost, 1: won
		// ex:  allWordleStatus = [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, null]

		let streaks = allWordleStatus.reduce(
			(res, n) => (n ? res[res.length - 1]++ : res.push(0), res),
			[0]
		)

		const findCurrentStreak = arr => {
			let currentStreak = 0
			if (arr[arr.length - 1] === 0) {
				return currentStreak
			} else {
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i] === 1) currentStreak++
					else if (arr[i] === 0) break
				}
			}
			return currentStreak
		}

		const percentageWin =
			(allWordleStatus.filter(ele => ele === 1).length / allWordleStatus.length) *
			100
		res.json({
			totalGamePlayed: allWordleStatus.length,
			percentageWin: Math.round(percentageWin * 10) / 10,
			currentStreak: findCurrentStreak(allWordleStatus),
			maxStreak: Math.max(...streaks)
		})
	} catch (err) {
		next(err)
	}
})
