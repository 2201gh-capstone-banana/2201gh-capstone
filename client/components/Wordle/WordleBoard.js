import React, { useState } from 'react';
import { boardDefault, rows } from './wordleUtilities/wordle';
import LetterCell from './LetterCell';

function WordleBoard() {
    const [board, setBoard] = useState(rows);
    // const [attempts, setAttempts] = useState(0);

    return (
        <div className="board">
            {board.map((row) => (
                <div className='row' key={row.id}>
                    <LetterCell index={row.id} attemptNum={0} />
                    <LetterCell index={row.id} attemptNum={1}/>
                    <LetterCell index={row.id} attemptNum={2}/>
                    <LetterCell index={row.id} attemptNum={3}/>
                    <LetterCell index={row.id} attemptNum={4}/>
                </div>
            ))}
        </div>
    )
}

export default WordleBoard;
