const router = require('express').Router()
const { requireToken } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, AcceptedWord, TargetWord }
} = require('../db')
module.exports = router

// router.get('/:id', async (req, res, next) => {
// 	try {
// 		let latestWordle = await WordleGame.findAll({
// 			where: { userId: req.params.id },
// 			include: AcceptedGuess
// 		})
// 		latestWordle = latestWordle[latestWordle.length - 1]
// 		if (latestWordle.acceptedGuesses.length === 5) {
// 			latestWordle === null
// 		}
// 		res.json(latestWordle)
// 	} catch (error) {
// 		next(error)
// 	}
// })

router.get('/:id', async (req, res, next) => {
	try {
		let latestWordle = await WordleGame.findOne({
			where: { userId: req.params.id },
			include:[{ model: AcceptedGuess}, {model: TargetWord}],
			order: [ [ 'createdAt' ]],
		})

		// latestWordle = latestWordle[latestWordle.length - 1]
		if (!latestWordle || latestWordle.acceptedGuesses.length === 6) {
			latestWordle === null
			latestWordle.acceptedGuesses = [];
		}
		res.json(latestWordle)
	} catch (error) {
		next(error)
	}
})

//we already get accepted latestguesses when we call our previous get route!
// router.get('/:id/latestguesses', async (req, res, next) => {
// 	try {
// 		let latestGuesses
// 		let latestWordle = await WordleGame.findAll({
// 			where: { userId: req.params.id },
// 			include: AcceptedGuess
// 		})
// 		latestWordle ? (latestWordle = latestWordle[latestWordle.length - 1]) : null
// 		if (!latestWordle || latestWordle.acceptedGuesses.length === 6) {
// 			latestGuesses === []
// 		} else {
// 			latestGuesses = latestWordle.acceptedGuesses
// 		}
// 		res.json(latestGuesses)
// 	} catch (error) {
// 		next(error)
// 	}
// })

const getRandomInt = max => {
	return Math.floor(Math.random() * max)
}

const completedPrevGameOrStartNewGame = async (req, res, next) => {
	try {
		let latestWordle = await WordleGame.findAll({
			where: { userId: req.params.id },
			include: [{ model: AcceptedGuess}, {model: TargetWord}]
		})
		latestWordle ? (latestWordle = latestWordle[latestWordle.length - 1]) : null
		if (!latestWordle || latestWordle.acceptedGuesses.length === 5) {
			next()
		} else {
			console.log('not finished game yet')
		}
	} catch (error) {
		next(error)
	}
}

//create a new target word and asign that to a new game - send back the new target word to client
router.get(
	'/:id/newTargetWord',

	completedPrevGameOrStartNewGame,
	async (req, res, next) => {
		try {
			const randomWord = await AcceptedWord.findByPk(getRandomInt(10656))
			const targetWord = await TargetWord.create({ content: randomWord.content })
			const newWordleGame = await WordleGame.create({
				targetWordId: targetWord.id,
				userId: req.params.id
			})
			res.json({ targetWord })
		} catch (error) {
			next(error)
		}
	}
)

//adding player's guesses to a wordle game in database as long as they have not finish the game
router.post('/:id/latestguesses', async (req, res, next) => {
	try {
		let latestGuesses
		let latestWordle = await WordleGame.findAll({
			where: { userId: req.params.id },
			include: AcceptedGuess
		})
		latestWordle ? (latestWordle = latestWordle[latestWordle.length - 1]) : null
		if (!latestWordle || latestWordle.acceptedGuesses.length === 5) {
			console.log('need logic written for front end')
			//have front end create a new game by fetching new target word
		} else {
			const newAcceptedGuess = await AcceptedGuess.create({
				wordleGameId: latestWordle.id,
				content: req.body.content
			})
			res.json(newAcceptedGuess)
		}
	} catch (error) {
		next(error)
	}
})
