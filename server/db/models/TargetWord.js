const Sequelize = require('sequelize')
const db = require('../db')

const TargetWord = db.define('targetWord', {
	content: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	}
})

module.exports = TargetWord
