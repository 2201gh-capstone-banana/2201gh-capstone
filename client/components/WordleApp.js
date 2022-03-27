import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses } from '../store/wordle'
import Sidebar from './SideBar'
// class WordleApp extends Component {

//     render() {
export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState(rows)
	const [translation, setTranslation] = useState(null)
	const dispatch = useDispatch()

	//componentDidMount equivalent-----------------
	useEffect(() => {
		dispatch(fetchAcceptedGuesses(1))
	}, [])

	const allGuesses = useSelector(state => state.wordle)
	console.log('all guesses are', allGuesses)
	//----------------------------------------------

	return (
		<div className="wordle-app">
			<h1>Wordle</h1>
			<Sidebar />
			<WordleAppContext.Provider
				value={{ board, setBoard, translation, setTranslation }}>
				<div className="game">
					<div id="webcam-parent">
						<h2>
							{translation ||
								'Hold up a letter in ASL to begin the detection!'}
						</h2>
						{/* <h2>Detecting: {translation}</h2> */}
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
