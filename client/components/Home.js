import React from 'react'
import './Home.css'

function Home() {
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
				<button className="btn btn-primary">Learning Center</button>
				<button className="btn btn-primary">
					Wordle Game <i className="far fa-play-circle" />
				</button>
			</div>
		</div>
	)
}

export default Home
