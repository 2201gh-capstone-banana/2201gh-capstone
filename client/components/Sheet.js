import React, { useState } from 'react'
import SheetModel from './SheetModel'
import * as AiIcons from 'react-icons/ai'

const Sheet = () => {
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
				Sheet
			</button> */}
			{modalOpen && <SheetModel setOpenModal={setModalOpen} />}
		</>
	)
}

export default Sheet