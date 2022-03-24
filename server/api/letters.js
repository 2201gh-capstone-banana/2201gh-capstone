const router = require('express').Router()
const {
	models: { Alphabet }
} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const letters = await Alphabet.findAll()
		res.json(letters)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const letter = await Alphabet.findByPk(req.params.id)
		res.json(letter)
	} catch (err) {
		next(err)
	}
})
