import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows, colorBoardDefault } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses, addAcceptedGuess } from '../store/wordle'
import { fetchTargetWord } from '../store/targetWord'
import { checkValidGuess } from '../store/checkValidGuess'
import Sidebar from './Sidebar'
import CheatSheetWordle from './CheatSheetWordle'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { data } from './Wordle/wordleUtilities/data'

// class WordleApp extends Component {

//     render() {

export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState([...boardDefault])
	const [translation, setTranslation] = useState(null)
	const [currentRow, setCurrentRow] = useState(0)
	const [timer, setTimer] = useState(5)
	const [guess, setGuess] = useState('')
	const [answer, setAnswer] = useState('')
	const [message, setMessage] = useState('')
	const [winningState, setWinningState] = useState(null)
	// const [validGuess, setValidGuess] = useState(null);
	const [guessCounter, setGuessCounter] = useState(0);
	// const [completedState, setCompletedState] = useState(nul);

	// const [color, setColor] =useState(colorBoardDefault);
	const dispatch = useDispatch()
	// const isValidGuess = useSelector(state => state.isValidGuess)
	// const addAcceptedGuess = useSelector(state => state.isValidGuess)

	//componentDidMount equivalent-----------------
	// const alert = useSelector(state => state.wordle.alert)
	console.log("BOARD", board)
	console.log("ALERT", alert)
	// console.log("Is this guess valid?", isValidGuess)
	console.log("GUESS", guess)

	// console.log('ALERT IS', alert)


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
		setMessage('');
	}


	function handleSubmit() {
		let newGuess = board[currentRow].join('').toLowerCase()
		if (data.includes(newGuess)) {
			setGuess(newGuess)
			dispatch(addAcceptedGuess(newGuess))
		} else{
			setMessage("This is not a valid word!");
		}
	}

	// useEffect(() => {
	// 	setMessage(alert);
	// }, [alert])
	/*
		function handleSubmit() {
			let newGuess = board[currentRow].join('').toLowerCase()
			setGuess(newGuess)
			dispatch(checkValidGuess(newGuess))
			// setGuessCounter((guessCounter) => {return guessCounter + 1});
			setGuessCounter(guessCounter + 1);
		}
	
		useEffect(() => {
			if (isValidGuess) {
				console.log("GBEASDZNGBASDFNBASNDBNABG", guess)
				dispatch(addAcceptedGuess(guess))
			} else if (isValidGuess === false) {
				setMessage('NOT A VALID WORD')
				//	setTimeout(setMessage(''), 1000)
			}
		}, [guessCounter])
	*/
	// useEffect(() => {
	// 	setValidGuess(isValidGuess);
	// }, [isValidGuess])

	// useEffect(() => {
	// 	if (validGuess) {
	// 		dispatch(addAcceptedGuess(guess))
	// 	} else if (validGuess === false) {
	// 		setMessage('NOT A VALID WORD')
	// 		//	setTimeout(setMessage(''), 1000)
	// 	}
	// }, [validGuess])

	// useEffect(() => {
	// 	setValidGuess(null);
	// }, [currentRow])

	// useEffect(() => {
	// 	if (winningState) {

	// 	} else if (winningState === false) {

	// 	}
	// }, [winningState])
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const [currentLetter, setCurrentLetter] = useState(null)
	return (
		<div className="wordle-app">
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
					setWinningState,
					// validGuess,
					// setValidGuess
				}}>
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
						<CheatSheetWordle
							cheatsheetOpen={[cheatsheetOpen, setCheatsheetOpen]}
							currentLetter={[currentLetter, setCurrentLetter]}
							currentRow={[currentRow, setCurrentRow]}
							currentBoard={[board, setBoard]}
						/>
					) : null}
				</div>
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
								translation && translation !== 'delete' && `Click the button to submit letter ${translation}`}
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
}


const mapStateToProps = state => {
	return {
		/* This is to check if the user is signed in. */
		correctUser: state.auth.correctUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signout: () => dispatch(signout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WordleApp)
