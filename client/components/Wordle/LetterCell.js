import React, { useContext, useEffect } from 'react'
import { WordleAppContext } from '../WordleApp'

function LetterCell({ rowIdx, index }) {
	//maybe use react hooks in here somehow?
	const { board, setBoard, answer, setAnswer } = useContext(WordleAppContext);
	// const cell = letter;
	// useEffect(() => {
	// 	console.log("forcing LetterCell to rerender")
	// }, [board])
	// console.log(board);

	// console.log(letter);
	const letter = board[rowIdx][index]
	const answerArr = answer.toUpperCase().split('');
	const correct = answerArr[index] === letter;
	const almost =
		!correct && letter !== "" && answerArr.includes(letter);
	const letterState = (correct ? "green" : almost ? "yellow" : "grey");

	return (
		<div className={`letter-cell ${letterState}`}>
				{letter}
		</div>
	)
}

export default LetterCell

/*
	Another attempt using an array of arrays:

	const { board, setBoard, answer, setAnswer, color, setColor } = useContext(WordleAppContext);

	const letter = board[rowIdx][index]
	const cellColor = color[rowIdx][index]
	useEffect(() => {
		let colorArrCopy = color;
		const answerArr = answer.toUpperCase().split('');
		const correct = answerArr[index] === letter;
		const almost =
			!correct && letter !== "" && answerArr.includes(letter);
		const letterState = (correct ? "green" : almost ? "yellow" : "grey");
		colorArrCopy[rowIdx][index] = letterState
		setColor(colorArrCopy);
	}, [answer])


	return (
		<div className={`letter-cell ${cellColor}`}>
			{letter}
		</div>
	)
*/