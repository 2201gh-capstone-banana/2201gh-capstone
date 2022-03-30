import React, { useContext, useEffect, useRef } from 'react'
import { WordleAppContext } from '../WordleApp'

function LetterCell({ rowIdx, index }) {
	//maybe use react hooks in here somehow?
	const { board, setBoard, answer, setAnswer } = useContext(WordleAppContext);
	const colorRef = useRef('white')

	const letter = board[rowIdx][index]
	useEffect(() => {
		if (letter !== "") {
			// const upperCaseLetter = letter.toUpperCase();
			const answerArr = answer.split('');
			const correct = answerArr[index] === letter;
			const almost =
				!correct && letter !== "" && answerArr.includes(letter);
			const letterState = (correct ? "green" : almost ? "yellow" : "grey");
			colorRef.current = letterState
		}
	}, [board, answer])
	
	return (
		<div className={`letter-cell ${colorRef.current}`}>
			{letter}
		</div>
	)
}

export default LetterCell

