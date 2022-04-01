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
	},
	isAdmin: {
		type: Sequelize.BOOLEAN
	},
	currentStreak: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	maxStreak: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}, 

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
User.decryptToken = async function (token) {
	try {
		//return jwt.verify(token, PASSPHRASE)
		const { id } = await jwt.verify(token, PASSPHRASE)
		return { id }
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

User.findByToken = async function (token) {
	try {
		const { id } = await jwt.verify(token, process.env.JWT)
		const user = User.findByPk(id)
		if (!user) {
			throw 'issue finding user from token'
		}
		return user
	} catch (ex) {
		const error = Error('bad token')
		error.status = 401
		throw error
	}
}

module.exports = User

/**
 * instanceMethods

 User.prototype.correctPassword = function(candidatePwd) {
	//we need to compare the plain version to an encrypted version of the password
	return bcrypt.compare(candidatePwd, this.password);
  }
  
  User.prototype.generateToken = function() {
	return jwt.sign({id: this.id}, process.env.JWT)
  }
  
  /**
   * 
   * classMethods
  
  User.authenticate = async function({ username, password }){
	  const user = await this.findOne({where: { username }})
	  if (!user || !(await user.correctPassword(password))) {
		const error = Error('Incorrect username/password');
		error.status = 401;
		throw error;
	  }
	  return user.generateToken();
  };
  
  User.findByToken = async function(token) {
	try {
	  const {id} = await jwt.verify(token, process.env.JWT)
	  const user = User.findByPk(id)
	  if (!user) {
		throw 'nooo'
	  }
	  return user
	} catch (ex) {
	  const error = Error('bad token')
	  error.status = 401
	  throw error
	}
  }
  

   * hooks

  const hashPassword = async(user) => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (user.changed('password')) {
	  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	}
  }
  
  
  User.beforeCreate(function (user, options) { 
	// user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
	user.username = user.username.toLowerCase();
  })
  
  User.beforeCreate(hashPassword)
  User.beforeUpdate(hashPassword)
  User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
  */