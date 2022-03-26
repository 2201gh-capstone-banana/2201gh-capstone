'use strict'

const {
	db,
	models: { User, Alphabet, Answer }
} = require('../server/db')
const answerBank = require('./answerBank')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }) // clears db and matches models to tables
	console.log('db synced!')

	// Creating Users
	const users = await Promise.all([
		User.create({
			username: 'cody',
			firstName: 'Cody',
			lastName: 'Roy',
			email: 'cody@gmail.com',
			password: '123'
		}),
		User.create({
			username: 'murphy',
			firstName: 'Murphy',
			lastName: 'Lin',
			email: 'murphy@gmail.com',
			password: '123'
		})
	])

	//letter
	const alphabet = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	]
	const letterImageUrl = [
		'letterA.png',
		'letterB.png',
		'letterC.png',
		'letterD.png',
		'letterE.png',
		'letterF.png',
		'letterG.png',
		'letterH.png',
		'letterI.png',
		'letterJ.png',
		'letterK.png',
		'letterL.png',
		'letterM.png',
		'letterN.png',
		'letterO.png',
		'letterP.png',
		'letterQ.png',
		'letterR.png',
		'letterS.png',
		'letterT.png',
		'letterU.png',
		'letterV.png',
		'letterW.png',
		'letterX.png',
		'letterY.png',
		'letterZ.png'
	]

	const letterTextUrl = [
		'texta.png',
		'textb.png',
		'textc.png',
		'textd.png',
		'texte.png',
		'textf.png',
		'textg.png',
		'texth.png',
		'texti.png',
		'textj.png',
		'textk.png',
		'textl.png',
		'textm.png',
		'textn.png',
		'texto.png',
		'textp.png',
		'textq.png',
		'textr.png',
		'texts.png',
		'textt.png',
		'textu.png',
		'textv.png',
		'textw.png',
		'textx.png',
		'texty.png',
		'textz.png'
	]

	for (let i = 0; i < alphabet.length; i++) {
		await Alphabet.create({
			letter: alphabet[i],
			imageUrl: letterImageUrl[i],
			textUrl: letterTextUrl[i]
		})
	}
	
	const answers = await Promise.all([
		answerBank.map((answer) => {
		  let chars = answer.split('');
		  Answer.create({
			word: answer,
			firstLetter: chars[0],
			secondLetter: chars[1],
			thirdLetter: chars[2],
			fourthLetter: chars[3],
			fifthLetter: chars[4],
		  })
		})])

	console.log(`seeded ${users.length} users`)
	console.log(`seeded successfully`)
	return {
		users: {
			cody: users[0],
			murphy: users[1]
		}
	}
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log('closing db connection')
		await db.close()
		console.log('db connection closed')
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
