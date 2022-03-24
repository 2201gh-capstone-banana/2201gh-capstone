import React, { useState } from 'react';
import { boardDefault, rows } from '.../utilities/wordle';
import LetterCell from './LetterCell';

export const GameplayContext = React.createContext();

function WordleBoard() {
    const [board, setBoard] = useState(boardDefault);
    const [attempts, setAttempts] = useState(0);

    return (
        <div className="board">
            <GameplayContext.Provider>
                <div className='row'>
                    {/* maybe this can be a map? */}
                    <LetterCell index={index} attemptNum={value} />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                </div>
                <div className='row'>
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                </div>
                <div className='row'>
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                </div>
                <div className='row'>
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                </div>
                <div className='row'>
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                </div>
                <div className='row'>
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                    <LetterCell />
                </div>
            </GameplayContext.Provider>
        </div>
    )
}

export default WordleBoard;
