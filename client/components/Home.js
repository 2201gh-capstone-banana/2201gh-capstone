import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'

import Brand from './Brand'
//https://youtu.be/tkMg8g8vVUo
function Home() {
	function videoOnReady(event) {
		event.target.playVideoAt(50)
	}
	function videoOnPlay(event) {
		const player = event.target
	}
	function videoStateChange(event) {
		const player = event.target
	}
	const redirectToGame = () => {
		window.location.pathname = '/wordle'
	}
	const redirectToLearning = () => {
		window.location.pathname = '/learning'
	}

	const opts = {
		height: '350',
		width: '600',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1
		}
	}
	const videoId = 'tkMg8g8vVUo'
	return (
		<header className="header">
			<section className="header__section">
				<Brand />
				<YouTube
					videoId={videoId}
					opts={opts}
					onReady={videoOnReady}
					onPlay={videoOnPlay}
					onStateChange={videoStateChange}
				/>
				<p className="header__about-main">
					Be My Voice is a translation web app that uses machine learning models
					to translate American sign language.
				</p>

				<p className="header__about-notice">
					This app needs permission to access your webcam
				</p>
				<div className="hero-btns">
					<button className="btn btn-primary" onClick={redirectToLearning}>
						Learning Center
					</button>
					<button className="btn btn-primary" onClick={redirectToGame}>
						Wordle Game
					</button>
					{/* <Link className="header__link" to="/signin">
						Get started
					</Link> */}
				</div>
			</section>
		</header>
	)
}

export default Home
