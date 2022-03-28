import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardDefault, rows } from './wordleUtilities'
import LetterCell from './LetterCell'
import { WordleAppContext } from '../WordleApp'

function WordleBoard() {
	const [currentRow, setCurrentRow] = useState(0)
	// const [attempts, setAttempts] = useState(0);
	const { board, setBoard } = useContext(WordleAppContext)

	const allAcceptedGuesses = useSelector(state => state.wordle)
	console.log('ALL ACCEPTED GUESSES', allAcceptedGuesses)
	useEffect(() => {
		const generateNewBoard = arr => {
			for (let i = 0; i < arr.length; i++) {
				rows[i] = arr[i]
			}
			return rows
		}
		console.log('GENERATE NEWBOARD-----', generateNewBoard(allAcceptedGuesses))
		setBoard(generateNewBoard(allAcceptedGuesses))
		// 	allAcceptedGuesses.length === 1
		// 		? setCurrentRow(0)
		// 		: setCurrentRow(allAcceptedGuesses.length + 1)
	}, [allAcceptedGuesses])
	// console.log('CURRENT ROW', currentRow)
	return (
		<div className="board">
			{board.map(row => {
				const rowId = row.id
				const cells = row.cells
				const letterCell = cells.map((cell, index) => {
					// let idx = cell[index];
					return (
						// <LetterCell key={index} rowIdx={rowId} letter={cell} />
						<LetterCell key={index} letter={cell} />
					)
				})
				return (
					<div className="row" key={rowId}>
						{letterCell}
					</div>
				)
			})}
		</div>
	)
}

export default WordleBoard
