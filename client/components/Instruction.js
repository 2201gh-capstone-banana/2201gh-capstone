import React, { useState, useContext, useEffect } from 'react'
import { WordleAppContext } from './WordleApp'
import InstructionModal from './InstructionModal'
import * as AiIcons from 'react-icons/ai'

const Instruction = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [buttonPopup, setButtonPopup] = useState(false)
	const [timePopup, setTimePopup] = useState(false)
	useEffect(() => {
		setTimeout(() => {
			setTimePopup(true)
		}, 1000)
	}, [])
	return (
		<>
			<AiIcons.AiOutlineFileSearch
				color="white"
				className="openModalBtn"
				onClick={() => setTimePopup(true)}
			/>
			{
				<InstructionModal
					trigger={timePopup}
					setTrigger={setTimePopup}
					toggle={() => setTimePopup(!timePopup)}
				/>
			}
		</>
	)
}

export default Instruction
