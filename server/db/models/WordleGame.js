const Sequelize = require('sequelize')
const db = require('../db')

const WordleGame = db.define('wordleGame', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	status: {
		type: Sequelize.INTEGER,
		defaultValue: null
	}
})

module.exports = WordleGame
