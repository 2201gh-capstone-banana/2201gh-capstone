const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const SALT_ROUNDS = 10
const PASSPHRASE = process.env.JWT

const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notEmpty: true,
			is: /\w+||\w+\-/i /* Must only include letters, numbers, underscores, and dashes. */
		}
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notEmpty: true,
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING
	}
})

/* HOOK: Hash password before adding to database. */
User.addHook('beforeValidate', async user => {
	try {
		user.password = bcrypt.hashSync(user.password, SALT_ROUNDS)
	} catch (err) {
		console.error(err)
	}
})

/* INSTANCE METHOD: Checks if an instance password matches their encrypted one in the database. */
User.prototype.decryptPassword = async function (password) {
	try {
		const compare = bcrypt.compareSync(password, this.password)

		if (compare) return true
		else return false
	} catch (err) {
		console.error(err)
	}
}

/*
	CLASS METHOD: Decrypts the JWT into an object, return example:
	{ id: 1, username: 'dean, password: $2b$10$/KTUxlFho.y2S6 }
	Else if password does not decrypt, return 'false'.
*/
User.decryptToken = function (token) {
	try {
		return jwt.verify(token, PASSPHRASE)
	} catch (err) {
		return false
	}
}

/*
	CLASS METHOD: Encrypts an object to be store in local storage using JWT. Example:
	bnZhdmovT21uUWh2Q3VvMUVERjBVLldUbmlTN0d6Q2JDV1ZxOEhlSENRb
*/

User.encryptToken = function (obj) {
	try {
		return jwt.sign(obj, PASSPHRASE)
	} catch (err) {
		return false
	}
}

module.exports = User
