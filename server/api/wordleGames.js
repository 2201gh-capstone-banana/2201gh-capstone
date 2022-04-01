const router = require('express').Router()
const { requireToken, isAdmin } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, AcceptedWord, TargetWord }
} = require('../db')
module.exports = router

const getRandomIdx = max => {
	return Math.floor(Math.random() * max)
}

const getMaxStreak = arr => {
	let maxStreak = 0;
	let streak = false;
	for (let i =0; i < arr.length; i++){
		let counter = 0
		if(arr[i]){
			counter ++;
			streak = true;
			if(counter > maxStreak){
				maxStreak = counter;
			}
		} else if(!arr[i]){
			counter = 0;
			streak = false
		}
	}
}

//find or create
router.get('/game', requireToken, async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized');
		}
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
	} catch (error) {
		console.log('Error in your post new game route')
		next(error)
	}
})

router.get('/score', async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized');
		}
		const wordleGames = await WordleGame.findAll({
			where: { userId: req.user.id },
			// include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt', 'DESC']]
		})
		let previousGuessesArr = wordleGames.map(game => {
			return game.status;
		})
		

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
router.post('/addGuess', requireToken, async (req, res, next) => {
	try {
		if (!req.user) {
			throw new Error('Unauthorized')
		}

		const isValidWord = await AcceptedWord.findOne({
			where: { content: req.body.content }
		})
		//isValidWord ? res.send(true) : res.send(false)

		if (isValidWord) {
			const latestWordle = await WordleGame.findOne({
				where: { userId: req.user.id },
				order: [['createdAt', 'DESC']]
			})
			const newAcceptedGuess = await AcceptedGuess.create({
				wordleGameId: latestWordle.id,
				content: req.body.content
			})
			res.json(newAcceptedGuess)
		} else {
			res.send(false)
		}
	} catch (error) {
		console.log('Error in your post new guess route')
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
