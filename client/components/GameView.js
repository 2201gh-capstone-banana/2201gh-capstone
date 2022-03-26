import React, { useState, useRef, useEffect } from 'react'
import Countdown from './Countdown'
import Random from './Random'

const GameView = ({ translation, guess }) => {
	const [possibleWord, setPossibleWord] = useState('')

	useEffect(() => {
		if (guess) {
			setPossibleWord(guess.join('').toLowerCase())
		}
	}, [guess])
	const handlePossibleWord = e => {
		let value = e.target.value.toLowerCase()
		setPossibleWord(value)
	}
	const restartWord = () => {
		setPossibleWord('')
	}
	return (
		<div class="wrapper">
			<h1>Typing game by Nikola Simovic</h1>
			<p>Type as many words as you can until time runs out!</p>
			<button>START</button>
			<div class="outerWrap">
				<div class="scoreWrap">
					<p>Score</p>
					<span class="score">0</span>
				</div>
				<div class="timeWrap">
					<p>Time left</p>
					<Countdown />
				</div>
			</div>
			<div class="wordsWrap">
				<p class="words">
					<Random possibleWord={possibleWord} restartWord={restartWord} />
				</p>
			</div>
			<div class="wordsWrap">
				<input value={possibleWord} onChange={handlePossibleWord} />
			</div>
		</div>
	)
}

export default GameView
