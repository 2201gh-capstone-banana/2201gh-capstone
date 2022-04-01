const router = require('express').Router()
const { requireToken, isAdmin } = require('./securityMiddleware')
const Sequelize = require('sequelize')
const {
    models: { User, WordleGame, AcceptedGuess, AcceptedWord, TargetWord }
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        // if (!req.user) {
        // 	throw new Error('Unauthorized');
        // }
        // const userGames = await WordleGame.findAll({
        //     where: { userId: 1 },
        //     group: 
        //     // group: [ '"AcceptedGuess".id' ],
        //     // attributes: ['content', [Sequelize.fn('COUNT', 'content'), 'GuessCount']],
        //     // group: "content",
        //     // include: [{
        //     //     model: WordleGame,
        //     //     // attributes: ['AcceptedGuess.*', [Sequelize.fn('COUNT', 'AcceptedGuess.content'), 'GuessCount']],
        //     //    include: {
        //     //        model: User,
        //     //        where: { id: 1 },
        //     //    },
        //     //     required: true
        //     // }]
        // })
        // const wordleGuesses = await AcceptedGuess.findAll({
        //     attributes:[ 
        //         "content", 
        //         [Sequelize.fn('COUNT', 'content'), 'guessCount']
        //     ],
        //     group: "content",
        //     // include: [{ 
        //     //     model: WordleGame, 
        //     //     include: [{
        //     //         model: User,
        //     //         where: { id: 1 },
        //     //     }]
        //     // }]
        // })
        res.json(wordleGuesses);
    } catch (error) {
        console.log('Error in your count accepted guesses route')
        next(error)
    }

})

