import React, { useContext } from 'react'
import { WordleAppContext } from '../WordleApp'

function LetterCell({ letter }) {
	//maybe use react hooks in here somehow?
	// const {board} = useContext(WordleAppContext);
	// const cell = letter;
	// console.log(letter);
	return <div className="letter-cell">{letter}</div>
}

export default LetterCell
