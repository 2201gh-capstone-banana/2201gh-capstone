import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { boardDefault, rows } from './wordleUtilities'
import WordRow from './WordRow';
import { WordleAppContext } from '../WordleApp'

function WordleBoard() {
    const [currentRow, setCurrentRow] = useState(0)
    // const [attempts, setAttempts] = useState(0);
    const { board, setBoard } = useContext(WordleAppContext)

    const allAcceptedGuesses = useSelector(state => state.wordle)
    console.log("ALL ACCEPTED GUESSES:", allAcceptedGuesses)
    useEffect(() => {
        console.log('THE TOP OF THE USEEFFECT TO SETBOARD')
        const generateNewBoard = arr => {
            // let newBoardArr = Array(6).fill('');
            console.log("GENERATE BOARD IS CALLED")
            if (arr.length !== 0) {
                for (let i = 0; i < arr.length; i++) {
                    // boardDefault[i] = arr[i]
                    // let boardCurrent = boardDefault[i];
                    let currentWord = arr[i].split('');
                    for (let j = 0; j < currentWord.length; j++) {
                        boardDefault[i][j] = currentWord[j];
                    }
                }
            }
            return boardDefault
            // let newBoardArr = Array(6).fill('');
            // newBoardArr.push(allAcceptedGuesses);
            // console.log('GENERATE NEWBOARD-----', generateNewBoard(allAcceptedGuesses))
        }
        setBoard(generateNewBoard(allAcceptedGuesses))
        console.log(board);
        // 	allAcceptedGuesses.length === 1
        // 		? setCurrentRow(0)
        // 		: setCurrentRow(allAcceptedGuesses.length + 1)
        // setBoard(allAcceptedGuesses);
    }, [allAcceptedGuesses])

    return (
        <div className="board">
            {board.map((row, index) => {
                // const rowId = row
                // const cells = row.cells;
                return (
                    <WordRow rowIdx={index} row={row} />
                )
            })}
        </div>
    )
}

export default WordleBoard
