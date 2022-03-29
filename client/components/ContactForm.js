import React, { useState } from 'react'
import ContactFormModal from './ContactFormModal'
import * as AiIcons from 'react-icons/ai'

const ContactForm = () => {
	const [modalOpen, setModalOpen] = useState(false)
	return (
		<>
			<AiIcons.AiOutlineContacts
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
			{modalOpen && <ContactFormModal setOpenModal={setModalOpen} />}
		</>
	)
}

export default ContactForm
