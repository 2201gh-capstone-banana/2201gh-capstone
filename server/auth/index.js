const router = require('express').Router()
const {
	models: { User }
} = require('../db')

/* /auth/manualsignin */
/* Route for users to manually signin. */
router.post('/manualsignin', async (req, res, next) => {
	try {
		const { username, password } = req.body

		/* If the request did not have a 'username' or 'password'. */
		if (!username || !password) {
			return res.send({ alert: 'Someting Went Wrong' })
		}

		/*
			Checks if that username exist before continuning.
			If user exist store in an object.
		*/
		const user = await User.findOne({ where: { username: username } })

		if (user) {
			/* Checks if the password is correct using an instance method. */
			const pwd = await user.decryptPassword(password)

			if (pwd) {
				/*
					Encrypts 'username' and 'password' using a class methond.
					Sends a encrypted object as response.
					Stored in local storage for auto signin.
				*/
				const token = await User.encryptToken({ username, password })
				return res.send({ token: token })
			}

			return res.send({ alert: 'Password Or Email Does Not Match' })
		}

		res.send({ alert: 'User Does Not Exist' })
	} catch (err) {
		next(err)
	}
})

/* /auth/signup */
/* Route for users to signup. */
router.post('/signup', async (req, res, next) => {
	try {
		const { email, password, username } = req.body

		/* If the request did not have a 'email', 'password', or 'username'. */
		if (!email || !password || !username) {
			return res.send({ alert: 'Someting Went Wrong' })
		}

		/* Checks if that email and username exist before continuning. */
		const hasEmail = await User.findOne({ where: { email: email } })
		const hasUsername = await User.findOne({ where: { username: username } })

		if (hasEmail) {
			return res.send({ alert: 'Email Already Exist' })
		} else if (hasUsername) {
			return res.send({ alert: 'That Username Is Taken' })
		}

		/* Create an instance. */
		const user = await User.create({
			username: username,
			email: email,
			password: password
		})

		/*
			Encrypts 'username' and 'password' using a class methond.
			Sends a encrypted object as response.
			Stored in local storage for auto signin.
		*/
		const token = await User.encryptToken({
			username: user.username,
			password: user.password
		})

		return res.send({ token: token })
	} catch (err) {
		next(err)
	}
})

/* /auth/autosignin */
/* Route for users to automatically signin. */
router.get('/autosignin', async (req, res, next) => {
	try {
		const token = req.headers.authorization

		/* If the headers include 'authorization'. */
		if (token) {
			/* Decrypts the 'token' using a class method. */
			const match = await User.decryptToken(token)

			/* If the decrypted 'token' matches a user in the database. */
			if (match) {
				return res.send(true)
			}
		}

		res.send(false)
	} catch (err) {
		next(err)
	}
})

module.exports = router
