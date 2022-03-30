import React, { useRef, useEffect, useCallback } from 'react'
import { WordleAppContext } from './WordleApp'
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'


const Modal = ({ setOpenModal }) => {
	const modalRef = useRef()
	const { winningState, setWinningState } = useContext(WordleAppContext)
	const dispatch = useDispatch()

	function handleNewGame() {
		setWinningState(null);
		dispatch(fetchAcceptedGuesses());
	}

	return (
		<div
			className="modalBackground"
			onClick={() => {
				setOpenModal(false)
			}}>
			<div className="modalContainer">
				<button
					onClick={() => {
						setOpenModal(false)
					}}>
					X
				</button>
				<div className="title">
					<h1>{winningState && 'Congratulations! You win!' || winningState === false && 'Sorry not quite! Try again next time.'}</h1>
				</div>
				{winningState !== null &&
					<div className="new-game-button">
						<button onClick={handleNewGame}>New Game</button>
					</div>}
				<div className="footer">
					<p>This is footer</p>
				</div>
			</div>
		</div>
	)
}

export default Modal
