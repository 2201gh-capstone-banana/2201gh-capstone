import React, { useRef, useEffect, useCallback } from 'react'
import { WordleAppContext } from './WordleApp'
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'

export default ({ setOpenModal, children }) => {
	const modalRef = useRef()

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
				<div class="leaderboard_container">{children}</div>
			</div>
		</div>
	)
}
