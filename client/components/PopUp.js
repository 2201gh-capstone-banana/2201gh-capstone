import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function PopUp() {
	const [popUpOpen, setPopUpOpen] = useState(true)
	let result
	popUpOpen
		? (result = (
				<div className="cheat-sheet">
					<div className="x-container">
						<button className="x-popup" onClick={() => setPopUpOpen(false)}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>

					<h1>Instructions</h1>

					<p>
						This app needs permission from your webcam to work. To play, use
						American Sign Language to guess the letters. If you don't know a
						letter in <abbr title="American Sign Language">ASL</abbr> check
						out the <Link to="/learning">learning section</Link>.
					</p>
				</div>
		  ))
		: (result = null)
	return result
}

export default PopUp
