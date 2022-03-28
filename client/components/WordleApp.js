import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
// import { boardDefault, rows } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses } from '../store/wordle'
import Sidebar from './SideBar'
// class WordleApp extends Component {

//     render() {

// const rows = 
// [
// 	['S', 'H', 'A', 'R', 'K'],
// 	['C', 'L', 'E', 'A', 'N'],
// 	['T', 'E', 'A', 'C', 'H'],
// 	['O', 'P', 'E', 'R', 'A'],
// 	['', '', '', '', ''],
// 	['', '', '', '', '']
// ]

export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState(rows)
	const [translation, setTranslation] = useState(null)
	const [currentRow, setCurrentRow] = useState(0);
	const [currentCellIdx, setCurrentCellIdx] = useState(0);
	const dispatch = useDispatch()

	//componentDidMount equivalent-----------------

	useEffect(() => {
		dispatch(fetchAcceptedGuesses(1))
	}, [])


	//----------------------------------------------

	useEffect(() => {

		// let t
		// console.log('t is !!!---', t)
		// clearTimeout(t)
		// let copyGuessWord = guess.slice()
		let boardRow = board.filter((row) => { row.id === currentRow })
		console.log(boardRow);
		// let cells = boardRow.cells;
		// if (translation !== null && translation !== 'O') {
		// 	//	const timeIntervalBetweenGuesses = setTimeout(() => { setGuess(translation) }, 3000)
		// 	console.log('tranlation in use effect is -----', translation)
		// 	t = setTimeout(() => {
		// 		boardRow.cells[currentCellIdx] === translation;
		// 		setCurrentCellIdx(currentCellIdx++);
		// 		// timer;
		// 	}, 3000)
		// 	console.log(boardRow);
		// setTimeout(setGuess(copyGuessWord), 0)

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

	return (
		<div className="wordle-app">
			<h1>Wordle</h1>
			<Sidebar />
			<WordleAppContext.Provider
				value={{ board, setBoard, translation, setTranslation }}>
				<div className="game">
					<div id="webcam-parent">
						<h2>
							{translation ||
								'Hold up a letter in ASL to begin the detection!'}
						</h2>
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
