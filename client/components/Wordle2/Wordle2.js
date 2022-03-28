import React, { useState, createContext, useEffect } from 'react'
import './Wordle2.css'
import Board2 from './Board2'
import Keyboard2 from './Keyboard2'
import { boardDefaul2 } from './Words2'

export const Wordle2Context = createContext()

const Wordle2 = props => {
	console.log('props=====', props)
	const [word, setWord] = useState(props.translation)
	const [board, setBoard] = useState(boardDefaul2)
	const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
	const [disabledLetters, setDisabledLetters] = useState([])
	const [gameOver, setGameOver] = useState({
		gameOver: false,
		guessedWord: false
	})
	const onSelectLetter = keyVal => {
		if (currAttempt.letterPos > 4) return
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
		setBoard(newBoard)
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
	}
	const onDelete = () => {
		if (currAttempt.letterPos === 0) return
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
		setBoard(newBoard)
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
	}

	const onEnter = () => {
		if (currAttempt.letterPos !== 5) return
		setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
	}

	return (
		<div className="wordle2">
			<nav>
				<h1>Wordle2</h1>
			</nav>
			<Wordle2Context.Provider
				value={{
					board,
					setBoard,
					currAttempt,
					setCurrAttempt,
					onSelectLetter,
					onDelete,
					onEnter,
					setDisabledLetters,
					disabledLetters,
					gameOver,
					word,
					setWord
				}}>
				<div className="game">
					<Board2 />
					<Keyboard2 translation={props.translation} />
				</div>
			</Wordle2Context.Provider>
		</div>
	)
}

export default Wordle2
