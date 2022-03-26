//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Alphabet = require('./models/Alphabet')

const Answer = require('./models/Answer')

//associations could go here!

module.exports = {
	db,
	models: {
		User,
		Alphabet,
    Answer
	}
}
