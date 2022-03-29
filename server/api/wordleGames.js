const router = require('express').Router()
const { requireToken } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, AcceptedWord, TargetWord }
} = require('../db')
module.exports = router

const getRandomIdx = max => {
	return Math.floor(Math.random() * max)
}

//find or create
router.get('/:id/game', async (req, res, next) => {
	try {
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.params.id },
			include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt']]
		})
		if (!latestWordle || latestWordle.acceptedGuesses.length === 6) {
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
			res.json(newWordleGame)
		} else {
			res.json(latestWordle)
		}
	} catch (error) {
		console.log('Error in your post new game route')
		next(error)
	}
})

router.post('/:id/:wordleGameId/addGuess', requireToken, async (req, res, next) => {
	try {
		const newAcceptedGuess = await AcceptedGuess.create({
			wordleGameId: req.params.wordleGameId,
			content: req.body.content
		})
		res.json(newAcceptedGuess)
	} catch (error) {
		console.log('Error in your post new guess route')
		next(error)
	}
})

router.get('/acceptedGuess', async (req, res, next) => {
	try {
		const acceptedGuess = await AcceptedGuess.findOne({
			where: { content: req.body.content }
		})
		acceptedGuess ? res.send(true) : res.send(false)
	} catch (error) {
		console.log('Err')
		next(error)
	}
})
