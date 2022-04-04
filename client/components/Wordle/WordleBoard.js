import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardDefault, rows } from './wordleUtilities'
import WordRow from './WordRow'
import { WordleAppContext } from '../WordleApp'

function WordleBoard() {
	const {
		board,
		setBoard,
		setCurrentRow,
		setAnswer } = useContext(WordleAppContext)

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
			];
			if (arr.length !== 0 && arr.length < 6 && arr.includes(targetWord) === false) {
				for (let i = 0; i < arr.length; i++) {
					let currentWord = arr[i].split('')
					for (let j = 0; j < currentWord.length; j++) {
						boardCopy[i][j] = currentWord[j]
					}
				}
				return boardCopy
			} else if (arr.length === 0) {
				return boardDefault;
			}
		}
		setBoard(generateNewBoard(allAcceptedGuesses))
		setCurrentRow(allAcceptedGuesses.length)
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
