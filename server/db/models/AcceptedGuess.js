const Sequelize = require('sequelize')
const db = require('../db')

const AcceptedGuess = db.define('acceptedGuess', {
	content: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		required: true,
		// duplicating: false
	},
	// rowNum: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull:false,
	// 	validate: {
	// 		notEmpty:true
	// 	}
	// }
})

module.exports = AcceptedGuess
