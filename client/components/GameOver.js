import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import { WordleAppContext } from './WordleApp'
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'

const GameOver = () => {
	// const [modalOpen, setModalOpen] = useState(false)
	const modalRef = useRef()
	const { winningState, setWinningState } = useContext(WordleAppContext)
	// const dispatch = useDispatch()

	// function handleNewGame() {
	// 	setWinningState(null);
	// 	dispatch(fetchAcceptedGuesses());
	// }
	const { modalOpen, setModalOpen } = useContext(WordleAppContext)
	const redirectToGame = () => {
		window.location.pathname = '/wordle'
	}
	const redirectToLearning = () => {
		window.location.pathname = '/learning'
	}

	return (
		<div
			className="modalBackground"
			onClick={() => {
				setModalOpen(false)
			}}>
			<div className="modal_Container">
				<div className="x-container">
					<button
						className="modalbtn"
						onClick={() => {
							setOpenModal(false)
						}}>
						X
					</button>
				</div>

				<div class="leaderboard_container">
					{winningState === false && <div>Sorry! Try Again</div>}
					{winningState === true && <div>You Win!!</div>}
					<div id="guess-distribution">
						<div class="no-data">No Data</div>
					</div>
					<div class="footer">
						<button className="btn btn-primary" onClick={redirectToLearning}>
							Back to Learning Center
						</button>
						<button className="btn btn-primary" onClick={redirectToGame}>
							Play a New Game!
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameOver
