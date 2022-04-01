const router = require('express').Router()
const { requireToken, isAdmin } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, AcceptedWord, TargetWord }
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

router.get('/:id/game', async (req, res, next) => {
	try {
		// if (!req.user) {
		// 	throw new Error('Unauthorized')
		// }
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.params.id },
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
				userId: req.params.id
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

// 		const isValidWord = await AcceptedWord.findOne({
// 			where: { content: req.body.content }
// 		})
// 		//isValidWord ? res.send(true) : res.send(false)

// 		if (isValidWord) {
// 			const latestWordle = await WordleGame.findOne({
// 				where: { userId: req.user.id },
// 				order: [['createdAt', 'DESC']],
// 				include: TargetWord
// 			})
// 			const newAcceptedGuess = await AcceptedGuess.create({
// 				wordleGameId: latestWordle.id,
// 				content: req.body.content
// 			})

// 			const allAcceptedGuesses = await AcceptedGuess.findAll({
// 				where: {
// 					wordleGameId: latestWordle.id
// 				}
// 			})
// 			const allguessArr = allAcceptedGuesses.map(ele => ele.content)
// 			res.json(allguessArr)

// 			if (allguessArr.includes(latestWordle.targetWord.content)) {
// 				await latestWordle.update({ ...latestWordle, status: true })
// 			} else {
// 				await latestWordle.update({ ...latestWordle, status: false })
// 			}

// 			//	res.json(newAcceptedGuess)
// 			res.json(latestWordle)
// 		} else {
// 			res.send(false)
// 		}
// 	} catch (error) {
// 		console.log('Error in your post new guess route')
// 		next(error)
// 	}
// })

router.post('/:id/addGuess', async (req, res, next) => {
	try {
		// if (!req.user) {
		// 	throw new Error('Unauthorized')
		// }

		const isValidWord = await AcceptedWord.findOne({
			where: { content: req.body.content }
		})
		//isValidWord ? res.send(true) : res.send(false)

		if (isValidWord) {
			const latestWordle = await WordleGame.findOne({
				where: { userId: req.params.id },
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
				await latestWordle.update({ ...latestWordle, status: true })
			} else if (
				allguessArr.length === 6 &&
				!allguessArr.includes(latestWordle.targetWord.content)
			) {
				await latestWordle.update({ ...latestWordle, status: false })
			}

			//	res.json(newAcceptedGuess)
			res.json(latestWordle)
		} else {
			res.send(false)
		}
	} catch (error) {
		console.log('Error in your post new guess route')
		next(error)
	}
})

router.put('/:id/updatewinning', async (req, res, next) => {
	try {
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.user.id },
			order: [['createdAt', 'DESC']]
		})
		await latestWordle.update({ ...latestWordle, status: req.body })
		res.json(latestWordle)
	} catch (error) {
		next(error)
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

router.get('/:id/latestWordle', async (req, res, next) => {
	try {
		const latestWordle = await WordleGame.findAll({
			where: { userId: req.params.id },
			order: [['createdAt', 'DESC']],
			include: TargetWord
		})
		// const allAcceptedGuesses = await AcceptedGuess.findAll({
		// 	where: {
		// 		wordleGameId: latestWordle.id
		// 	}
		// })
		//	const statusArr = allAcceptedGuesses.map(ele => ele.content)

		res.json(latestWordle)
	} catch (err) {
		next(err)
	}
})
