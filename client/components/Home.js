import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Home.css'
import Main from './Main'
import { fetchAllLetters } from '../store/letters'

// export const LettersContext = React.createContext()

const Home = () => {
	const redirectToGame = () => {
		window.location.pathname = '/main'
	}
	const redirectToLearning = () => {
		window.location.pathname = '/learning'
	}

	return (
		<div className="hero-container">
			<video
				src="https://www.youtube.com/watch?v=ezmsrB59mj8"
				autoPlay
				loop
				muted
			/>
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
