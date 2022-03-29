import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
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
			<Link className="header__link" to="/home">
				Get started
			</Link>
		</div>
	)
}

export default LandingPage
