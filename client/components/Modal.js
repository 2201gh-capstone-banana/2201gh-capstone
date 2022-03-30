import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'


const Modal = ({ setOpenModal }) => {
	const modalRef = useRef()

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
					<h1>This is title</h1>
				</div>
				<div className="body">
					<p>This is body</p>
				</div>
				<div className="footer">
					<p>This is footer</p>
				</div>
			</div>
		</div>
	)
}

export default Modal
