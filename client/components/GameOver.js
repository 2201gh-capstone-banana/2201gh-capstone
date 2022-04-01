import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import { WordleAppContext } from './WordleApp'
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'

const GameOver = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const modalRef = useRef()
	const { winningState, setWinningState } = useContext(WordleAppContext)
	// const dispatch = useDispatch()

	// function handleNewGame() {
	// 	setWinningState(null);
	// 	dispatch(fetchAcceptedGuesses());
	// }

	return (
		<div
			className="modalBackground"
			onClick={() => {
				setModalOpen(false)
			}}>
			<div className="modal_Container">
				<button
					onClick={() => {
						setModalOpen(true)
					}}>
					X
				</button>
				<div class="leaderboard_container">
					{winningState === false && <div>Sorry! Try Again</div>}
					{winningState === true && <div>You Win!!</div>}
					<div id="guess-distribution">
						<div class="no-data">No Data</div>
					</div>
					<div class="footer"></div>
				</div>
			</div>
		</div>
	)
}

export default GameOver
