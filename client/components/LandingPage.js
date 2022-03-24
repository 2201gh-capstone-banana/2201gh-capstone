import React from 'react'
import { Link } from 'react-router-dom'

import Brand from './Brand'

const LandingPage = () => {
	return (
		<header className="header">
			<Brand />

			<section className="header__section">
				<p className="header__about-main">
					Be My Voice is a translation web app that uses machine learning models
					to translate American sign language.
				</p>

				<p className="header__about-notice">
					This app needs permission to access your webcam
				</p>
				<Link className="header__link" to="/home">
					Get started
				</Link>
			</section>
		</header>
	)
}

export default LandingPage
