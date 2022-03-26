const router = require('express').Router()
const {
	models: { User, WordleGame, AcceptedGuess }
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ['id', 'username']
		})
		res.json(users)
	} catch (err) {
		next(err)
	}
})

router.get('/:id/wordle', async (req, res, next) => {
	try {
		let latestWordle = await WordleGame.findAll({
			where: { userId: req.params.id },
			include: AcceptedGuess
		})
		latestWordle = latestWordle[latestWordle.length - 1]
		if (latestWordle.acceptedGuesses.length === 5) {
			latestWordle === null
		}
		res.json(latestWordle)
	} catch (error) {
		next(error)
	}
})

router.get('/:id/latestguesses', async (req, res, next) => {
	try {
		let latestGuesses
		let latestWordle = await WordleGame.findAll({
			where: { userId: req.params.id },
			include: AcceptedGuess
		})
		latestWordle = latestWordle[latestWordle.length - 1]
		if (latestWordle.acceptedGuesses.length === 5) {
			latestGuesses === null
		} else {
			latestGuesses = latestWordle.acceptedGuesses
		}
		res.json(latestGuesses)
	} catch (error) {
		next(error)
	}
})
