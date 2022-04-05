import React, { useState, useContext, useEffect } from 'react'
import { WordleAppContext } from './WordleApp'
import Modal from './Modal'
import * as AiIcons from 'react-icons/ai'
import { fetchMaxStreak } from '../store/stats'
import { useDispatch } from 'react-redux'

const LeaderBoard = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const dispatch = useDispatch()

	return (
		<>
			<AiIcons.AiOutlineBarChart
				color="black"
				className="openModalBtn"
				onClick={() => {
					console.log('ABOUT TO FETCH MAX STREAK')
					setModalOpen(true)
					dispatch(fetchMaxStreak())
				}}
			/>

			{modalOpen && <Modal setOpenModal={setModalOpen} />}
		</>
	)
}

export default LeaderBoard
