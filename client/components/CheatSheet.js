import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WordleAppContext } from './WordleApp'

function CheatSheet(props) {
	let [currentLetter, setCurrentLetter] = props.currentLetter
	let [cheatsheetOpen, setCheatsheetOpen] = props.cheatsheetOpen
	// let [board, setBoard] = props.currentBoard
	// let [currentRow, setCurrentRow] = props.currentRow
	// const { board, setBoard, currentRow, setCurrentRow } = useContext(WordleAppContext)
	const allLetterInfo = useSelector(state => state.lettersReducer)

	// const handleFillInBoard = letter => {
	// 	let boardCopy = board
	// 	for (let i = 0; i < 6; i++) {
	// 		if (boardCopy[currentRow][i] === '') {
	// 			boardCopy[currentRow][i] = letter
	// 			break
	// 		}
	// 	}
	// 	setBoard(boardCopy)
	// }

	return (
		<div className="cheat-sheet">
			<div className="container">
				{allLetterInfo.map(ele => (
					<div
						key={ele.id}
						className="card"
						onClick={() => {
							setCurrentLetter(ele.letter)
							setCheatsheetOpen(!cheatsheetOpen)
							//		handleFillInBoard(ele.letter)
						}}>
						<img className="img-cheatsheet" src={ele.imageUrl} />
						<div>{ele.letter}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CheatSheet
