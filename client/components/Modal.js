import React, { useRef, useEffect, useCallback } from 'react'
import { WordleAppContext } from './WordleApp'
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'

const Modal = ({ setOpenModal }) => {
	const modalRef = useRef()
	const { totalGamePlayed, percentageWin, currentStreak, maxStreak } = useSelector(
		state => state.stats
	)

	return (
		<div
			className="modalBackground"
			onClick={() => {
				setOpenModal(false)
			}}>
			<div className="modal_Container">
				<button
					onClick={() => {
						setOpenModal(false)
					}}>
					X
				</button>
				<div class="leaderboard_container">
					<p className="container_header">Statistics</p>
					<div id="statistics">
						<div class="statistic-container">
							<div class="statistic">{totalGamePlayed}</div>
							<div class="label">Played</div>
						</div>

						<div class="statistic-container">
							<div class="statistic">{percentageWin}</div>
							<div class="label">Win %</div>
						</div>

						<div class="statistic-container">
							<div class="statistic">{currentStreak}</div>
							<div class="label">Current Streak</div>
						</div>

						<div class="statistic-container">
							<div class="statistic">{maxStreak}</div>
							<div class="label">Max Streak</div>
						</div>
					</div>
					<p className="container_header">Guess Distribution</p>
					<div id="guess-distribution">
						<div class="no-data">No Data</div>
					</div>
					<div class="footer"></div>
				</div>
			</div>
		</div>
	)
}

export default Modal
