import React, { useState } from 'react'
import Modal from './Modal'
import * as AiIcons from 'react-icons/ai'

const LeaderBoard = () => {
	const [modalOpen, setModalOpen] = useState(false)
	return (
		<>
			<AiIcons.AiOutlineBarChart
				color="black"
				className="openModalBtn"
				onClick={() => {
					setModalOpen(true)
				}}
			/>
			{/* <button
				className="openModalBtn"
				onClick={() => {
					setModalOpen(true)
				}}>
				LeaderBoard
			</button> */}
			{modalOpen && <Modal setOpenModal={setModalOpen} />}
		</>
	)
}

export default LeaderBoard
