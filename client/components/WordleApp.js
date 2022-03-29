import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows, colorBoardDefault } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses } from '../store/wordle'
import { fetchTargetWord } from '../store/targetWord'
import Sidebar from './SideBar'
// class WordleApp extends Component {

//     render() {

export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState(boardDefault);
	const [translation, setTranslation] = useState(null)
	const [currentRow, setCurrentRow] = useState(0);
	const [timer, setTimer] = useState(5);
	const [guess, setGuess] = useState(Array(5).fill(''));
	const [answer, setAnswer] = useState('');
	const [color, setColor] =useState(colorBoardDefault);
	const dispatch = useDispatch()
	// console.log("TRANSLATION", translation);

	//componentDidMount equivalent-----------------
	useEffect(() => {
		dispatch(fetchAcceptedGuesses(1))
		dispatch(fetchTargetWord(1))
	}, [])

	//----------------------------------------------

	useEffect(() => {

		/*
		we are going to submit the letter when timer =0
		everytime translation changes, timer is reset
		*/
		// let countdown = 5;
		let countdown = timer;
		function detectLetters() {
			let boardCopy = board;
			// if (translation) {
			// 	for (let i = 0; i < 6; i++) {
			// 		if (boardCopy[currentRow][i] === '') {
			// 			boardCopy[currentRow][i] = translation
			// 			break
			// 		}
			// 	}
			// 	return boardCopy;
			// }
			// if (!translation){
			// 	setTimer(5);
			// }
			if (translation && countdown > 0) {
				countdown--;
				setTimer(countdown);
			} else if (translation && countdown === 0) {
				for (let i = 0; i < 6; i++) {
					if (boardCopy[currentRow][i] === '') {
						boardCopy[currentRow][i] = translation
						setTimer(5);
						break;
					}
				}
				setBoard(boardCopy)
			}
		}
		setInterval(detectLetters, 1000);
	}, [translation])

	return (
		<div className="wordle-app">
			<h1>Wordle</h1>
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
					setAnswer,
					color, 
					setColor
				}}>
				<div className="game">
					<div id="webcam-parent">
						<h2>
							{translation ||
								'Hold up a letter in ASL to begin the detection!'}
						</h2>
						<h3>Hold for: {timer} seconds</h3>
						{/* <h2>Detecting: {translation}</h2> */}
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