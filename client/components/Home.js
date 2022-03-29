import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'

import Brand from './Brand'
//https://youtu.be/tkMg8g8vVUo
class Home extends Component {
	videoOnReady(event) {
		event.target.playVideoAt(50)
	}
	videoOnPlay(event) {
		const player = event.target
	}
	videoStateChange(event) {
		const player = event.target
		console.log(player.getCurrentTime())
	}

	componentWillUnmount() {
		const { playerObj } = this.state
		console.log(player.getCurrentTime())
	}
	render() {
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
				<Brand />

				<section className="header__section">
					<YouTube
						videoId={videoId}
						opts={opts}
						onReady={this.videoOnReady}
						onPlay={this.videoOnPlay}
						onStateChange={this.videoStateChange}
					/>
					<p className="header__about-main">
						Be My Voice is a translation web app that uses machine learning
						models to translate American sign language.
					</p>

					<p className="header__about-notice">
						This app needs permission to access your webcam
					</p>
					<Link className="header__link" to="/signin">
						Get started
					</Link>
				</section>
			</header>
		)
	}
}

export default Home
