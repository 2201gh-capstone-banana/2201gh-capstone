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

				{/* <form ref={form} onSubmit={sendEmail}>
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
					<button type="submit">Send Message</button>
				</form> */}
				<div class="wrapper">
					<h2>CONTACT US</h2>
					<form action="" method="POST" ref={form} onSubmit={sendEmail}>
						<div class="form-group">
							<input
								type="text"
								name="Name"
								id="name"
								placeholder="First and Last"
								required
								minlength="3"
								maxlength="25"
							/>
						</div>
						<div class="form-group">
							<input
								type="email"
								name="Email"
								id="email"
								placeholder="email@domain.tld"
								required
							/>
						</div>
						<div class="form-group">
							<textarea
								name="Message"
								id="message"
								rows="5"
								placeholder="Type your message here...."></textarea>
						</div>
						<div class="form-group">
							<button type="submit" class="submit">
								<i class="far fa-paper-plane"></i>Send
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ContactFormModal
