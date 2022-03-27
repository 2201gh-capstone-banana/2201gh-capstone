//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Alphabet = require('./models/Alphabet')
const TargetWord = require('./models/TargetWord')
const AcceptedGuess = require('./models/AcceptedGuess')
const WordleGame = require('./models/WordleGame')
const AcceptedWord = require('./models/AcceptedWord')

const Answer = require('./models/Answer')

//associations could go here!
//user has many wordleGame, wordleGame belongs to 1 user
//targetWords has many acceptedGuess, acceptedGuessed has many targetWords through wordleGames
//wordleGames has many acceptedGuess

TargetWord.hasMany(WordleGame)
WordleGame.belongsTo(TargetWord)

User.hasMany(WordleGame)
WordleGame.belongsTo(User)

// TargetWord.belongsToMany(User, { through: WordleGame })
// User.belongsToMany(TargetWord, { through: WordleGame })

WordleGame.hasMany(AcceptedGuess)
AcceptedGuess.belongsTo(WordleGame, { foreignKey: 'wordleGameId' })

module.exports = {
	db,
	models: {
		User,
		Alphabet,
		TargetWord,
		WordleGame,
		AcceptedWord,
		AcceptedGuess
	}
}
