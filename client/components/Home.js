import React from 'react'
import './Home.css'
import Main from './Main'

function Home() {
	const redirectToGame = () => {
		window.location.pathname = '/main'
	}
	const redirectToLearning = () => {
		window.location.pathname = '/learning'
	}
	return (
		<div className="hero-container">
			<video src="Bee.mp4" autoPlay loop muted />
			<h1>BE MY VOICE</h1>
			<p>What are you waiting for?</p>
			<div className="hero-btns">
				<button className="btn btn-primary" onClick={redirectToLearning}>
					Learning Center
				</button>
				<button className="btn btn-primary" onClick={redirectToGame}>
					Wordle Game
				</button>
			</div>
		</div>
	)
}

export default Home
