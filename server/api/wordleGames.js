const router = require('express').Router()
const { requireToken, isAdmin } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, TargetWord }
} = require('../db')
module.exports = router

const getRandomIdx = max => {
	return Math.floor(Math.random() * max)
}

//find or create
// router.get('/game', requireToken, async (req, res, next) => {
// 	try {
// 		if (!req.user) {
// 			throw new Error('Unauthorized')
// 		}
// 		const latestWordle = await WordleGame.findOne({
// 			where: { userId: req.user.id },
// 			include: [{ model: AcceptedGuess }, { model: TargetWord }],
// 			order: [['createdAt', 'DESC']]
// 		})
// 		let previousGuessesArr = latestWordle.acceptedGuesses.map(guess => {
// 			return guess.content.toUpperCase()
// 		})
// 		let targetWord = latestWordle.targetWord.content.toUpperCase()
// 		if (
// 			!latestWordle ||
// 			latestWordle.acceptedGuesses.length === 6 ||
// 			previousGuessesArr.includes(targetWord)
// 		) {
// 			const targetWordList = await TargetWord.findAll({
// 				attributes: ['content']
// 			})
// 			const targetWord = await TargetWord.findByPk(
// 				getRandomIdx(targetWordList.length)
// 			)
// 			// const targetWord = await TargetWord.create({ content: randomWord.content })
// 			const newWordleGame = await WordleGame.create({
// 				targetWordId: targetWord.id,
// 				userId: req.user.id
// 			})
// 			const returnNewWordleGame = await WordleGame.findOne({
// 				where: { id: newWordleGame.id },
// 				include: [{ model: AcceptedGuess }, { model: TargetWord }],
// 				order: [['createdAt', 'DESC']]
// 			})
// 			res.json(returnNewWordleGame)
// 		} else {
// 			res.json(latestWordle)
// 		}
// 	} catch (error) {
// 		console.log('Error in your post new game route')
// 		next(error)
// 	}
// })

router.get('/game', requireToken, async (req, res, next) => {
	try {
		// if (!req.user) {
		//  throw new Error('Unauthorized')
		// }
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.user.id },
			include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt', 'DESC']]
		})
		let previousGuessesArr = latestWordle.acceptedGuesses.map(guess => {
			return guess.content.toUpperCase()
		})
		let targetWord = latestWordle.targetWord.content.toUpperCase()
		if (
			!latestWordle ||
			latestWordle.acceptedGuesses.length === 6 ||
			previousGuessesArr.includes(targetWord)
		) {
			const targetWordList = await TargetWord.findAll({
				attributes: ['content']
			})
			const targetWord = await TargetWord.findByPk(
				getRandomIdx(targetWordList.length)
			)
			// const targetWord = await TargetWord.create({ content: randomWord.content })
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
		//    res.send(latestWordle)
	} catch (error) {
		console.log('Error in your post new game route')
		next(error)
	}
})

// router.post('/addGuess', requireToken, async (req, res, next) => {
// 	try {
// 		if (!req.user) {
// 			throw new Error('Unauthorized');
// 		  }
// 		const latestWordle = await WordleGame.findOne({
// 			where: { userId: req.user.id },
// 			order: [['createdAt', 'DESC']]
// 		})
// 		const newAcceptedGuess = await AcceptedGuess.create({
// 			wordleGameId: latestWordle.id,
// 			content: req.body.content
// 		})
// 		res.json(newAcceptedGuess)
// 	} catch (error) {
// 		console.log('Error in your post new guess route')
// 		next(error)
// 	}
// })
// router.post('/addGuess', requireToken, async (req, res, next) => {
// 	try {
// 		if (!req.user) {
// 			throw new Error('Unauthorized')
// 		}

// 		// const isValidWord = await AcceptedWord.findOne({
// 		// 	where: { content: req.body.content }
// 		// })
// 		//isValidWord ? res.send(true) : res.send(false)

// 		// if (isValidWord) {
// 		const latestWordle = await WordleGame.findOne({
// 			where: { userId: req.user.id },
// 			order: [['createdAt', 'DESC']]
// 		})
// 		const newAcceptedGuess = await AcceptedGuess.create({
// 			wordleGameId: latestWordle.id,
// 			content: req.body.content
// 		})
// 		res.json(newAcceptedGuess)
// 		// } else {
// 		// 	res.send(false)
// 		// }
// 	} catch (error) {
// 		console.log('Error in your post new guess route')
// 		next(error)
// 	}
// })

router.post('/addGuess', requireToken, async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized')
		}

		// const isValidWord = await AcceptedWord.findOne({
		// 	where: { content: req.body.content }
		// })
		//isValidWord ? res.send(true) : res.send(false)

		// if (isValidWord) {
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
		// } else {
		// 	res.send(false)
		// }
	} catch (error) {
		console.log('Error in your post new guess route')
		next(error)
	}
})

router.get('/stats', requireToken, async (req, res, next) => {
	try {
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

		const percentageWin =
			(allWordleStatus.filter(ele => ele === 1).length / allWordleStatus.length) *
			100
		res.json({
			totalGamePlayed: allWordleStatus.length,
			percentageWin,
			maxStreak: Math.max(...streaks)
		})
	} catch (err) {
		next(err)
	}
})

// router.post('/acceptedWord', async (req, res, next) => {
// 	try {
// 		const isValidWord = await AcceptedWord.findOne({
// 			where: { content: req.body.content }
// 		})
// 		isValidWord ? res.send(true) : res.send(false)
// 	} catch (error) {
// 		console.log('Err')
// 		next(error)
// 	}
// })

// router.get('/:id/latestWordle', async (req, res, next) => {
// 	try {
// 		const latestWordle = await WordleGame.findOne({
// 			where: { userId: req.params.id },
// 			order: [['createdAt', 'DESC']]
// 		})
// 		res.json(latestWordle)
// 	} catch (err) {
// 		next(err)
// 	}
// })
