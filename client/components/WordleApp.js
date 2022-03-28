import React, { Component, useState, useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WordleBoard from './Wordle/WordleBoard'
import WordleDetection from './WordleDetection'
import { boardDefault, rows } from './Wordle/wordleUtilities'
import { fetchAcceptedGuesses } from '../store/wordle'
import {fetchTargetWord } from '../store/targetWord'
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
		dispatch(fetchTargetWord(1))
	}, [])

	//----------------------------------------------


	// useEffect(() => {
	// 	let t
	// 	console.log('t is !!!---', t)
	// 	clearTimeout(t)
	// 	let copyGuessWord = guess.slice()
	// 	if (translation !== null && translation !== 'O') {
	// 		//	const timeIntervalBetweenGuesses = setTimeout(() => { setGuess(translation) }, 3000)
	// 		console.log('tranlation in use effect is -----', translation)
	// 		t = setTimeout(() => {
	// 			for (let i = 0; i < 6; i++) {
	// 				if (copyGuessWord[i] === '') {
	// 					copyGuessWord[i] = translation
	// 					break
	// 				}
	// 			}
	// 			// timer;
	// 		}, 3000)
	// 		setTimeout(setGuess(copyGuessWord), 0)
	// 	} else if (translation === 'O') {
	// 		clearTimeout(t)
	// 		t = setTimeout(() => {
	// 			for (let i = 0; i < 6; i++) {
	// 				if (copyGuessWord[i] !== '' && copyGuessWord[i + 1] === '') {
	// 					copyGuessWord.splice(i, 1, '')

	// 					break
	// 				}
	// 			}
	// 		}, 3000)
	// 		setTimeout(setGuess(copyGuessWord), 0)
	// 	}
	// }, [translation])

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
