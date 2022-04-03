import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WordleAppContext } from './WordleApp'

function CongratsModal(props) {
	let [congratsModalOpen, setCongratsModalOpen] = props.congratsModalOpen
	const correctUser = useSelector(state => state.auth.correctUser)

	const redirectToGame = () => {
		correctUser
			? (window.location.pathname = '/wordle')
			: (window.location.pathname = '/signin')
	}
	const redirectToLearning = () => {
		window.location.pathname = '/learning'
	}
	console.log('CORRECT USER IS ', correctUser)
	return (
		<div className="modalBackground">
			<div className="congrats">
				<div className="container-congrats">
					<img src="bee.png" />

					<div className="btn-container">
						<button className="header__link" onClick={redirectToLearning}>
							Practice Again
						</button>
						<button className="header__link" onClick={redirectToGame}>
							Go to Game Center
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CongratsModal
