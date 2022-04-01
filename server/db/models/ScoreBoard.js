const Sequelize = require('sequelize')
const db = require('../db')

const ScoreBoard = db.define('wordleGame', {
    currentStreak: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	maxStreak: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}, 
    row1Guesses: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
    row2Guesses: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
    row3Guesses: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
    row4Guesses: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
    row5Guesses: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
    row6Guesses: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
})

module.exports = ScoreBoard
