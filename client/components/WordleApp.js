import React, { Component, useState, createContext } from 'react';
import WordleBoard from './Wordle/WordleBoard';
import ASLDetection from './ASLDetection';
import { boardDefault, rows } from './Wordle/wordleUtilities';

// class WordleApp extends Component {

//     render() {
export const WordleAppContext = createContext();
function WordleApp() {
    const [board, setBoard] = useState(rows);

    return (
        <div className='wordle-app'>
            <h1>Wordle</h1>
            <WordleAppContext.Provider value={{ board, setBoard }}>
                <div className='game'>
                    <WordleBoard />
                </div>
                {/* <div className='guess'>
                    <ASLDetection />
                </div> */}
                {/* <Webcam/> or <Translation/> component */}
            </WordleAppContext.Provider>
        </div>
    )
    //     }
}

export default WordleApp;