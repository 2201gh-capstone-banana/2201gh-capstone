const router = require('express').Router()
const { requireToken } = require('./securityMiddleware')
const {
	models: { WordleGame, AcceptedGuess, AcceptedWord, TargetWord }
} = require('../db')
module.exports = router


router.get('/:id', async (req, res, next) => {
	try {
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.params.id },
			include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt']],
		})
		if (!latestWordle || latestWordle.acceptedGuesses.length === 6) {
			latestWordle === null
			latestWordle.acceptedGuesses = [];
		}
		res.json(latestWordle)
	} catch (error) {
		next(error)
	}
})

const getRandomIdx = max => {
	return Math.floor(Math.random() * max)
}

const completedPrevGameOrStartNewGame = async (req, res, next) => {
	try {
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.params.id },
			include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt']],
		})
		currentGame ? (latestWordle) : null
		if (!currentGame || currentGame.acceptedGuesses.length === 6) {
			next()
		} else {
			console.log('not finished game yet')
		}
	} catch (error) {
		next(error)
	}
}

router.post(
	'/:id/newGame',
	completedPrevGameOrStartNewGame,
	async (req, res, next) => {
		try {
			const targetWordList = await TargetWord.findAll({
				attributes: ['content']
			});
			const targetWord = await TargetWord.findByPk(getRandomIdx(targetWordList.length))
			// const targetWord = await TargetWord.create({ content: randomWord.content })
			const newWordleGame = await WordleGame.create({
				targetWordId: targetWord.id,
				userId: req.params.id
			})
			res.json(newWordleGame)
		} catch (error) {
			console.log("Error in your post new game route")
			next(error)
		}
	}
)


router.post('/:id/:wordleId/addGuess', async (req, res, next) => {
	try {
		/*
		since the game has already been fetched in this instance  
		we could maybe pass gameId as a req.params or as req.body.
		
		const currentGame = await WordleGame.findByPk(req.params.id, {
			// not really necessary since we just need the id
			// include: [{ model: AcceptedGuess }, { model: TargetWord }],
		});
		*/
		
		/* 
		alternative option to above if we want to just use the userId!
		*/
		
		const currentGame = await WordleGame.findOne({
			where: { userId: req.params.id }
		})
		
		const newAcceptedGuess = await AcceptedGuess.create({
			wordleGameId: currentGame.id,
			content: req.body.content
		})
		res.json(newAcceptedGuess)
	} catch (error) {
		console.log("Error in your post new guess route")
		next(error)
	}
})

//adding player's guesses to a wordle game in database as long as they have not finish the game
/* 
router.post('/:id/latestguesses', async (req, res, next) => {
	try {
		let latestGuesses
		const latestWordle = await WordleGame.findOne({
			where: { userId: req.params.id },
			include: [{ model: AcceptedGuess }, { model: TargetWord }],
			order: [['createdAt']],
		})
		currentGame ? latestWordle : null
		if (!currentGame || currentGame.acceptedGuesses.length === 5) {
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
*/
