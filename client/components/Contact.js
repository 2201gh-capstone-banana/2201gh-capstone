import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { useRef } from 'react'
import emailjs from 'emailjs-com'

const Contact = () => {
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
	return (
		<section id="contact">
			<h5>Get in Touch</h5>
			<h2>Contact Me</h2>
			<div className="container contact__container">
				<form ref={form} onSubmit={sendEmail}>
					<input
						type="text"
						name="name"
						placeholder="enter your full name"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="enter your email"
						required
					/>
					<textarea
						name="message"
						rows="7"
						placeholder="your message"
						required></textarea>
					<button type="submit" className="btn btn-primary">
						Send Message
					</button>
				</form>
			</div>
		</section>
	)
}

export default Contact
