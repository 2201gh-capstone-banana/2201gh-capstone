import React, { useState, useContext, useEffect } from 'react'
import { WordleAppContext } from './WordleApp'
import Modal from './Modal'
import * as AiIcons from 'react-icons/ai'


const LeaderBoard = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const {winningState, setWinningState} = useContext(WordleAppContext)
	useEffect(() => {
		if(winningState){
			setModalOpen(true);
		} if (winningState === false){
			setModalOpen(true)
		}
	}, [winningState])
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
