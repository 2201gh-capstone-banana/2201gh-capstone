import React, { useState } from 'react'
import ContactFormModal from './ContactFormModal'
import * as AiIcons from 'react-icons/ai'

const ContactForm = () => {
	const [modalOpen, setModalOpen] = useState(false)
	return (
		<>
			<AiIcons.AiOutlineContacts
				color="white"
				className="openModalBtn"
				onClick={() => {
					setModalOpen(true)
				}}
			/>
			{modalOpen && <ContactFormModal setOpenModal={setModalOpen} />}
		</>
	)
}

export default ContactForm
