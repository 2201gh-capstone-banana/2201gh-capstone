import React, { useState, useContext, useEffect } from 'react'
import { WordleAppContext } from './WordleApp'
import Modal from './Modal'
import * as AiIcons from 'react-icons/ai'
import { fetchMaxStreak } from '../store/stats'
import { useDispatch } from 'react-redux'

const LeaderBoard = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const dispatch = useDispatch()
	// const {winningState, setWinningState} = useContext(WordleAppContext)
	// useEffect(() => {
	// 	if(winningState){
	// 		setModalOpen(true);
	// 	} if (winningState === false){
	// 		setModalOpen(true)
	// 	}
	// }, [winningState])
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
