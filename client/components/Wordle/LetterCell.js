import React, { useContext } from 'react'
import { WordleAppContext } from '../WordleApp'

function LetterCell({ rowIdx, index }) {
	//maybe use react hooks in here somehow?
	const { board, setBoard } = useContext(WordleAppContext);
	// const cell = letter;
	// useEffect(() => {
	// 	console.log("forcing LetterCell to rerender")
	// }, [board])
	// console.log(board);

	// console.log(letter);
	const letter = board[rowIdx][index]

	return (
		<div className='letter-cell'>
			{letter}
		</div>
	)
}

export default LetterCell
