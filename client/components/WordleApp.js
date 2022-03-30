import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows, colorBoardDefault } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses, addAcceptedGuess } from '../store/wordle'
import { fetchTargetWord } from '../store/targetWord'
import { checkValidGuess } from '../store/checkValidGuess'
import Sidebar from './Sidebar'
import CheatSheet from './CheatSheet'

// class WordleApp extends Component {

//     render() {

export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState(boardDefault)
	const [translation, setTranslation] = useState(null)
	const [currentRow, setCurrentRow] = useState(0)
	const [timer, setTimer] = useState(5)
	const [guess, setGuess] = useState('')
	const [answer, setAnswer] = useState('')
	const [message, setMessage] = useState('')
	const [winningState, setWinningState] = useState(null);
	// const [completedState, setCompletedState] = useState(nul);

	// const [color, setColor] =useState(colorBoardDefault);
	const dispatch = useDispatch()
	const isValidGuess = useSelector(state => state.isValidGuess)
	// const addAcceptedGuess = useSelector(state => state.isValidGuess)

	console.log('IS VALID GUESS-------', isValidGuess)
	console.log('board on state', board)

	// console.log("TRANSLATION", translation);

	//componentDidMount equivalent-----------------
	useEffect(() => {
		dispatch(fetchAcceptedGuesses())
		dispatch(fetchTargetWord())
	}, [])

	function handleOnClick() {
		let boardCopy = board
		for (let i = 0; i < 6; i++) {
			if (boardCopy[currentRow][i] === '') {
				boardCopy[currentRow][i] = translation
				break
			}
		}
		setBoard(boardCopy)
	}
	function handleDelete() {
		setMessage('')
		let boardCopy = board
		for (let i = 0; i < 6; i++) {
			if (
				(boardCopy[currentRow][i] !== '' &&
					boardCopy[currentRow][i + 1] === '') ||
				i === 4
			) {
				boardCopy[currentRow][i] = ''
				break
			}
		}
		setBoard(boardCopy)
	}

	function handleSubmit() {
		let newGuess = board[currentRow].join('').toLowerCase()
		console.log('THIS IS NEW GUESS', newGuess)
		setGuess(newGuess)
		dispatch(checkValidGuess(newGuess))
		console.log('AFTER DISPATCH IS THIS VALID', isValidGuess)
	}
  
	console.log('GUESS HAS BEEN SET', guess)
	useEffect(() => {
		console.log('GET IN USEEFFECT AT ALL????????------')

		if (isValidGuess) {
			console.log('IS VALID GET CONDITION')
			console.log('get in use Effect-----', guess)
			dispatch(addAcceptedGuess(guess))
			window.location.reload();
		} else if (isValidGuess === false) {
			console.log('IS INVALID GET CONDITION')
			setMessage('NOT A VALID WORD')
			//	setTimeout(setMessage(''), 1000)
		}
	}, [isValidGuess])

	function handleNewGame(){
		// dispatch(fetchAcceptedGuesses());
	}
	useEffect(() => {
		if (winningState){

		} else if (winningState === false){

		}
	}, [winningState])

	console.log('what is MESSAGE THEN??', message)
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const [currentLetter, setCurrentLetter] = useState(null)
	return (
		<div className="wordle-app">
			<h1>Wordle</h1>
			<div className="container">
				<button
					id="btn-cheatsheet"
					className="header__link"
					onClick={() => {
						setCheatsheetOpen(!cheatsheetOpen)
					}}>
					Cheat Sheet
				</button>
				{cheatsheetOpen ? (
					<CheatSheet
						cheatsheetOpen={[cheatsheetOpen, setCheatsheetOpen]}
						currentLetter={[currentLetter, setCurrentLetter]}
					/>
				) : null}
			</div>

			<Sidebar />
			<WordleAppContext.Provider
				value={{
					board,
					setBoard,
					translation,
					setTranslation,
					currentRow,
					setCurrentRow,
					answer,
					setAnswer,
					winningState, 
					setWinningState
				}}>
				<div className="game">
					<div id="webcam-parent">
						<h2>{message}</h2>
						<h2>
							{(translation === 'delete' && 'Deleting...') ||
								translation ||
								'Hold up a letter in ASL to begin the detection!'}
						</h2>
						<h3>
							{(translation === 'delete' &&
								'Click the button to delete your last submission') ||
								`Click the button to submit letter ${translation}`}
						</h3>
						{/* <h2>Detecting: {translation}</h2> */}
						{/* <button id='wordle-capture' onClick={handleOnClick}>{translation === 'O' && 'Delete' || `Click to capture letter`} </button> */}
						{(board[currentRow].includes('') && translation !== 'delete' && (
							<button
								className="btn-wordle header__link"
								onClick={handleOnClick}>
								Click to capture letter
							</button>
						)) ||
							(translation === 'delete' && (
								<button
									className="btn-wordle header__link"
									onClick={handleDelete}>
									Click to Delete
								</button>
							))}
						{translation !== 'delete' && !board[currentRow].includes('') && (
							<button
								className="btn-wordle header__link"
								onClick={handleSubmit}>
								Submit
							</button>
						)}
						<WordleDetection />
					</div>
					<div id="board-parent">
						<WordleBoard />
					</div>
				</div>
			</WordleAppContext.Provider>
		</div>
	)
	//     }
}

export default WordleApp
