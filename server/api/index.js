const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/wordle', require('./wordleGames'))
router.use('/letters', require('./letters'))

router.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})
