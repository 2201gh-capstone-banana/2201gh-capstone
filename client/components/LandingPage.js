import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
	return (
		<header className="header">
			<section className="header__section">
				<img src="logo.svg" alt="website logo" className="header__logo" />
				<h1 className="header__title">Be My Voice</h1>
			</section>

			<section className="header__section">
				<p className="header__about-main">
					Be My Voice is a translation web app that uses machine learning models
					to translate American sign language.
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

export default LandingPage
