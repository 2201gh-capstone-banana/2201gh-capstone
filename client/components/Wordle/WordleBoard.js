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
		setValidGuess,
		modalOpen,
		setModalOpen
	} = useContext(WordleAppContext)

	const allAcceptedGuesses = useSelector(state => state.wordle.guesses)
	const targetWord = useSelector(state => state.targetWord)

	useEffect(() => {
		const generateNewBoard = arr => {
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
					let currentWord = arr[i].split('')
					for (let j = 0; j < currentWord.length; j++) {
						boardCopy[i][j] = currentWord[j]
					}
				}
				if (arr.length === 6 && arr.includes(targetWord) === false) {
					setWinningState(false)
					setModalOpen(true)
				} else if (arr.includes(targetWord)) {
					setWinningState(true)
					setModalOpen(true)
				}

				return boardCopy
			} else if (arr.length === 0) {
				return boardDefault
			}
		}

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
				return <WordRow key={index} rowIdx={index} row={row} />
			})}
		</div>
	)
}

export default WordleBoard
