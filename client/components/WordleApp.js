import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows, colorBoardDefault } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses, addAcceptedGuess } from '../store/wordle'
import { fetchTargetWord } from '../store/targetWord'
import { checkValidGuess } from '../store/checkValidGuess'
import Sidebar from './Sidebar'
import CheatSheet from './CheatSheet'

// class WordleApp extends Component {

//     render() {

export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState(boardDefault)
	const [translation, setTranslation] = useState(null)
	const [currentRow, setCurrentRow] = useState(0)
	const [timer, setTimer] = useState(5)
	const [guess, setGuess] = useState('')
	const [answer, setAnswer] = useState('')
	const [message, setMessage] = useState('')
	// const [color, setColor] =useState(colorBoardDefault);
	const dispatch = useDispatch()
	const isValidGuess = useSelector(state => state.isValidGuess)
	console.log('IS VALID GUESS-------', isValidGuess)
	console.log('board on state', board)

	// console.log("TRANSLATION", translation);

	//componentDidMount equivalent-----------------
	useEffect(() => {
		dispatch(fetchAcceptedGuesses(1))
		dispatch(fetchTargetWord(1))
	}, [])

	function handleOnClick() {
		let boardCopy = board
		for (let i = 0; i < 6; i++) {
			if (boardCopy[currentRow][i] === '') {
				boardCopy[currentRow][i] = translation
				break
			}
		}
		setBoard(boardCopy)
	}

	function handleDelete() {
		setMessage('')
		let boardCopy = board
		for (let i = 0; i < 6; i++) {
			if (
				(boardCopy[currentRow][i] !== '' &&
					boardCopy[currentRow][i + 1] === '') ||
				i === 4
			) {
				boardCopy[currentRow][i] = ''
				break
			}
		}
		setBoard(boardCopy)
	}

	function handleSubmit() {
		let newGuess = board[currentRow].join('').toLowerCase()
		console.log('THIS IS NEW GUESS', newGuess)
		setGuess(newGuess)
		dispatch(checkValidGuess(newGuess))
		console.log('AFTER DISPATCH IS THIS VALID', isValidGuess)
		// if (isValidGuess) {
		// 	console.log('THE WORD IS VALID AND ABOUT TO GET TO THUNK', newGuess)
		// 	dispatch(addAcceptedGuess(1, newGuess))
		// } else {
		// 	console.log('is this a valid guess?', isValidGuess)
		// }
	}
	console.log('GUESS HAS BEEN SET', guess)
	useEffect(() => {
		console.log('GET IN USEEFFECT AT ALL????????------')

		if (isValidGuess) {
			console.log('IS VALID GET CONDITION')
			console.log('get in use Effect-----', guess)
			dispatch(addAcceptedGuess(1, guess))
		} else if (isValidGuess === false) {
			console.log('IS INVALID GET CONDITION')
			setMessage('NOT A VALID WORD')
			//	setTimeout(setMessage(''), 1000)
		}
	}, [isValidGuess])
	console.log('what is MESSAGE THEN??', message)
	// useEffect(() => {

	// 	// if (isValidGuess){
	// 	// 	dispatch(addAcceptedGuess(1, newGuess));
	// 	// }
	// 	// else {
	// 	// 	console.log("is this a valid guess?" ,isValidGuess)
	// 	// }
	// }, [guess])
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const [currentLetter, setCurrentLetter] = useState(null)
	return (
		<div className="wordle-app">
			<h1>Wordle</h1>
			<div className="container">
				<button
					id="btn-cheatsheet"
					className="header__link"
					onClick={() => {
						setCheatsheetOpen(!cheatsheetOpen)
					}}>
					Cheat Sheet
				</button>
				{cheatsheetOpen ? (
					<CheatSheet
						cheatsheetOpen={[cheatsheetOpen, setCheatsheetOpen]}
						currentLetter={[currentLetter, setCurrentLetter]}
					/>
				) : null}
			</div>
			<Sidebar />
			<WordleAppContext.Provider
				value={{
					board,
					setBoard,
					translation,
					setTranslation,
					currentRow,
					setCurrentRow,
					answer,
					setAnswer
				}}>
				<div className="game">
					<div id="webcam-parent">
						<h2>{message}</h2>
						<h2>
							{(translation === 'delete' && 'Deleting...') ||
								translation ||
								'Hold up a letter in ASL to begin the detection!'}
						</h2>
						<h3>
							{(translation === 'delete' &&
								'Click the button to delete your last submission') ||
								`Click the button to submit letter ${translation}`}
						</h3>
						{/* <h2>Detecting: {translation}</h2> */}
						{/* <button id='wordle-capture' onClick={handleOnClick}>{translation === 'O' && 'Delete' || `Click to capture letter`} </button> */}
						{(board[currentRow].includes('') && translation !== 'delete' && (
							<button
								className="btn-wordle header__link"
								onClick={handleOnClick}>
								Click to capture letter
							</button>
						)) ||
							(translation === 'delete' && (
								<button
									className="btn-wordle header__link"
									onClick={handleDelete}>
									Click to Delete
								</button>
							))}
						{translation !== 'delete' && !board[currentRow].includes('') && (
							<button
								className="btn-wordle header__link"
								onClick={handleSubmit}>
								Submit
							</button>
						)}
						<WordleDetection />
					</div>
					<div id="board-parent">
						<WordleBoard />
					</div>
				</div>
			</WordleAppContext.Provider>
		</div>
	)
	//     }
}

export default WordleApp

/*
function gotResult(error, results) {
	document.getElementById("welldone").textContent = "";
	document.getElementById("sparkles").style.display = "none";
	if (results[0].confidence > 0.70) {
		console.log("Confidence");
		if (results[0].label == targetLabel.toString()) {
			console.log(targetLabel);
			iterationCounter = iterationCounter + 1;

			console.log(iterationCounter)

			if (iterationCounter == 30) {
				console.log("30!")
				iterationCounter = 0;
				nextPose();
			}
			else {
				console.log("doin this")
				timeLeft = timeLeft - 1;
				if (timeLeft < 10) {
					document.getElementById("time").textContent = "00:0" + timeLeft;
				} else {
					document.getElementById("time").textContent = "00:" + timeLeft;
				}
				setTimeout(classifyPose, 1000);
			}
		}

		else {
			errorCounter = errorCounter + 1;
			console.log("error");
			if (errorCounter >= 4) {
				console.log("four errors");
				iterationCounter = 0;
				timeLeft = 30;
				if (timeLeft < 10) {
					document.getElementById("time").textContent = "00:0" + timeLeft;
				} else {
					document.getElementById("time").textContent = "00:" + timeLeft;
				}
				errorCounter = 0;
				setTimeout(classifyPose, 100);
			} else {
				setTimeout(classifyPose, 100);
			}
		}
	}
	else {
		console.log("whatwe really dont want")
		setTimeout(classifyPose, 100);
	}
}

function classifyPose() {
	if (pose) {
		let inputs = [];
		for (let i = 0; i < pose.keypoints.length; i++) {
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;
			inputs.push(x);
			inputs.push(y);
		}
		yogi.classify(inputs, gotResult);
	} else {
		console.log("Pose not found");
		setTimeout(classifyPose, 100);
	}
}

useEffect(() => {
	function detectLetters() {
		let boardCopy = board;
		if (translation) {
			for (let i = 0; i < 6; i++) {
				if (boardCopy[currentRow][i] === '') {
					boardCopy[currentRow][i] = translation
					break
				}
			}
			return boardCopy;
		}
	}
	// let t
	// console.log('t is !!!---', t)
	// clearTimeout(t)
	// let boardCopy = board;
	// console.log("Board Copy before calling if statement", boardCopy)
	// console.log("CURRENT ROW",currentRow)

	// if (translation !== null && translation !== 'O') {
	// 	//	const timeIntervalBetweenGuesses = setTimeout(() => { setGuess(translation) }, 3000)
	// 	console.log('tranlation in use effect is -----', translation)
	// 	t = setTimeout(() => {
	// 		for (let i = 0; i < 6; i++) {
	// 			if (boardCopy[currentRow][i] === '') {
	// 				boardCopy[currentRow][i] = translation
	// 				break
	// 			}
	// 		}
	// 		// timer;
	// 	}, 3000)

	// 	setTimeout(setBoard(boardCopy), 5000)
	// }

	// else if (translation === 'O') {
	// 	clearTimeout(t)
	// 	t = setTimeout(() => {
	// 		for (let i = 0; i < 6; i++) {
	// 			if (copyGuessWord[i] !== '' && copyGuessWord[i + 1] === '') {
	// 				copyGuessWord.splice(i, 1, '')

	// 				break
	// 			}
	// 		}
	// 	}, 3000)
	// 	setTimeout(setGuess(copyGuessWord), 0)
	// }
}, [translation])


		// let t
		// console.log('t is !!!---', t)
		// clearTimeout(t)
		// let boardCopy = board;
		// console.log("Board Copy before calling if statement", boardCopy)
		// console.log("CURRENT ROW",currentRow)

		// if (translation !== null && translation !== 'O') {
		// 	//	const timeIntervalBetweenGuesses = setTimeout(() => { setGuess(translation) }, 3000)
		// 	console.log('tranlation in use effect is -----', translation)
		// 	t = setTimeout(() => {
		// 		for (let i = 0; i < 6; i++) {
		// 			if (boardCopy[currentRow][i] === '') {
		// 				boardCopy[currentRow][i] = translation
		// 				break
		// 			}
		// 		}
		// 		// timer;
		// 	}, 3000)

		// 	setTimeout(setBoard(boardCopy), 5000)
		// }

		// else if (translation === 'O') {
		// 	clearTimeout(t)
		// 	t = setTimeout(() => {
		// 		for (let i = 0; i < 6; i++) {
		// 			if (copyGuessWord[i] !== '' && copyGuessWord[i + 1] === '') {
		// 				copyGuessWord.splice(i, 1, '')

		// 				break
		// 			}
		// 		}
		// 	}, 3000)
		// 	setTimeout(setGuess(copyGuessWord), 0)
		// }

*/
