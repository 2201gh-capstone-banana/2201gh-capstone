import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses } from '../store/wordle'
// import { fetch}
import Sidebar from './SideBar'
// class WordleApp extends Component {

//     render() {
/*
  const [winningWord, setWinningWord] = useState('');
  const [letterCounts, setLetterCounts] = useState({});
  const [guessingWords, setGuessingWords] = useState(Array(6).fill(''));
  const [currentWord, _setCurrentWord] = useState('');
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [isWinning, setIsWinning] = useState(false);
  const [noneWordErr, setNoneWordErr] = useState('');
  const [buttonTheme, setButtonTheme] = useState({
    green: 'a ',
    yellow: 'a ',
    gray: 'a '
  });

*/


export const WordleAppContext = createContext()
function WordleApp() {
	const [board, setBoard] = useState(boardDefault);
	const [translation, setTranslation] = useState(null)
	const dispatch = useDispatch()

	//componentDidMount equivalent-----------------
	useEffect(() => {
		dispatch(fetchAcceptedGuesses(1))
		// dispatch(fetchAcceptedGuesses(1))
	}, [])

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
