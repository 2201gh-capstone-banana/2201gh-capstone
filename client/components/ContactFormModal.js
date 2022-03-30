import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import emailjs from 'emailjs-com'

const ContactFormModal = ({ setOpenModal }) => {
	const form = useRef()
	const sendEmail = e => {
		e.preventDefault()
		emailjs.sendForm(
			'service_9lxrh4x',
			'template_ymvgycl',
			form.current,
			'user_I7zYrsWnt3gWSOrqz7h5R'
		)
		e.target.reset()
	}
	const modalRef = useRef()

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<button
					onClick={() => {
						setOpenModal(false)
					}}>
					X
				</button>

				<form className="footer" ref={form} onSubmit={sendEmail}>
					<input
						type="text"
						name="name"
						placeholder="Enter your full name"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						required
					/>
					<textarea
						name="message"
						rows="7"
						placeholder="Your message"
						required></textarea>
					<button type="submit" >
						Send Message
					</button>
				</form>
			</div>
		</div>
	)
}

export default ContactFormModal
