import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'

import Brand from './Brand'

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
			autoplay: 1
		}
	}
	const videoId = 'tkMg8g8vVUo'
	// const videoId = 'KMUV4vjJqLM'

	return (
		<header className="header">
			<Brand />

			<div className="youtube">
				<YouTube
					videoId={videoId}
					opts={opts}
					onReady={videoOnReady}
					onPlay={videoOnPlay}
					onStateChange={videoStateChange}
				/>
			</div>

			<p className="header__about-main">
				Be My Voice is a translation web app that uses machine learning models to
				translate American sign language.
			</p>

			<p className="header__about-notice">
				This app needs permission to access your webcam
			</p>
			<div className="hero-btns">
				<button className="btn btn-primary" onClick={redirectToLearning}>
					Learning Center
				</button>
				<button className="btn btn-primary" onClick={redirectToGame}>
					Game Center
				</button>
			</div>
		</header>
	)
}

export default Home
