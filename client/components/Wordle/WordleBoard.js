import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardDefault, rows } from './wordleUtilities'
import LetterCell from './LetterCell'
import { WordleAppContext } from '../WordleApp'

function WordleBoard() {
	// const [board, setBoard] = useState(rows);
	// const [attempts, setAttempts] = useState(0);
	const { board, setBoard } = useContext(WordleAppContext)

	const allAcceptedGuesses = useSelector(state => state.wordle)

	useEffect(() => {
		setBoard(allAcceptedGuesses)
	}, [allAcceptedGuesses])

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
