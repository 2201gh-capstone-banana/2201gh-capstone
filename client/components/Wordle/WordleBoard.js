import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardDefault, rows } from './wordleUtilities'
import WordRow from './WordRow'
import { WordleAppContext } from '../WordleApp'

function WordleBoard() {
	// const [currentRow, setCurrentRow] = useState(0)
	// const [attempts, setAttempts] = useState(0);

	const {
		board,
		setBoard,
		currentRow,
		setCurrentRow,
		answer,
		setAnswer,
		winningState,
		setWinningState,
		setValidGuess
	} = useContext(WordleAppContext)

	// const allAcceptedGuesses = useSelector(state => state.wordle)
	const allAcceptedGuesses = useSelector(state => state.wordle.guesses)
	const targetWord = useSelector(state => state.targetWord)
	console.log('WINNING STATE IN WORDLE BOARD', winningState)
	console.log('ALL ACCEPTED GUESSES IN WORDLE BOARD', allAcceptedGuesses)
	console.log('BOARD IS IN WODLEBOARD', board)
	console.log('CURRENT ROW IS', currentRow)
	console.log('BOARD AT CURRENT ROW', board[currentRow])

	useEffect(() => {
		const generateNewBoard = arr => {
			// let newBoardArr = Array(6).fill('');
			// console.log("GENERATE BOARD IS CALLED")

			const boardCopy = [
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', '']
			]
			if (arr.length !== 0 && arr.length <= 6) {
				for (let i = 0; i < arr.length; i++) {
					// boardDefault[i] = arr[i]
					// let boardCurrent = boardDefault[i];
					let currentWord = arr[i].split('')
					for (let j = 0; j < currentWord.length; j++) {
						boardCopy[i][j] = currentWord[j]
					}
				}
				if (arr.length === 6 && arr.includes(targetWord) === false) {
					setWinningState(false)
				} else if (arr.length === 6 && arr.includes(targetWord)) {
					setWinningState(true)
				}

				return boardCopy
			} else if (arr.length === 0) {
				return boardDefault
			}
			// else if (arr.includes(targetWord)) {
			// 	setWinningState(true)
			// 	// window.re
			// 	//	window.location.href = '/wordle/winning-page'
			// } else if (arr.length === 6) {
			// 	//	window.location.href = '/wordle/losing-page'
			// 	setWinningState(false)
			// }
			// let newBoardArr = Array(6).fill('');
			// newBoardArr.push(allAcceptedGuesses);
			// console.log('GENERATE NEWBOARD-----', generateNewBoard(allAcceptedGuesses))
		}
		// setValidGuess(null);

		if (allAcceptedGuesses.length <= 6) {
			setBoard(generateNewBoard(allAcceptedGuesses))
			setCurrentRow(allAcceptedGuesses.length)
		}
	}, [allAcceptedGuesses])

	useEffect(() => {
		setAnswer(targetWord)
	}, [targetWord])

	return (
		<div className="board">
			{board.map((row, index) => {
				// const rowId = row
				// const cells = row.cells;
				return <WordRow rowIdx={index} row={row} />
			})}
		</div>
	)
}

export default WordleBoard
