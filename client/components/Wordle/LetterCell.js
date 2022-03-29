import React, { useContext, useEffect, useRef } from 'react'
import { WordleAppContext } from '../WordleApp'

function LetterCell({ rowIdx, index }) {
	//maybe use react hooks in here somehow?
	const { board, setBoard, answer, setAnswer } = useContext(WordleAppContext);
	const colorRef = useRef('white')
	// console.log(answer);
	// console.log(colorRef)
	// const cell = letter;
	// useEffect(() => {
	// 	console.log("forcing LetterCell to rerender")
	// }, [board])
	// console.log(board);

	// console.log(letter);
	const letter = board[rowIdx][index]
	useEffect(() => {
		if (letter !== "") {
			const answerArr = answer.toUpperCase().split('');
			console.log(letter)
			console.log(index)
			console.log(answerArr)
			const correct = answerArr[index] === letter;
			const almost =
				!correct && letter !== "" && answerArr.includes(letter);
			const letterState = (correct ? "green" : almost ? "yellow" : "grey");
			colorRef.current = letterState
		}
	}, [answer])
	// if (letter !== "") {
	// 	const answerArr = answer.toUpperCase().split('');
	// 	const correct = answerArr[index] === letter;
	// 	const almost =
	// 		!correct && letter !== "" && answerArr.includes(letter);
	// 	const letterState = (correct ? "green" : almost ? "yellow" : "grey");
	// 	colorRef.current = letterState
	// }

	return (
		<div className={`letter-cell ${colorRef.current}`}>
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