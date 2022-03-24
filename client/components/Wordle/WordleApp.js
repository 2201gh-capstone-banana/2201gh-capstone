import React, { Component } from 'react';
import WordleBoard from './WordleBoard';

class WordleApp extends Component {

    render() {
        return (
            <div className='wordle-app'>
                <h1>Wordle</h1>
                <div className='game'>
                    <WordleBoard />
                </div>
                {/* <Webcam/> or <Translation/> component */}
            </div>
        )
    }
}

export default WordleApp;