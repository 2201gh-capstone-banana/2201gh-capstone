import React, { useContext } from 'react'
import { WordleAppContext } from './WordleApp'

const GameOver = () => {
	const { winningState } = useContext(WordleAppContext)

	const { setModalOpen } = useContext(WordleAppContext)
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
							setModalOpen(false)
						}}>
						X
					</button>
				</div>

				<div class="leaderboard_container winning-text">
					{winningState === false && <div>Sorry! Try Again</div>}
					{winningState === true && <div>You Win!!</div>}
					<div>
						<button
							className="btn-winning first"
							onClick={redirectToLearning}>
							Learning Center
						</button>
						<button className="btn-winning first" onClick={redirectToGame}>
							Play Again!
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameOver
