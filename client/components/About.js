import React from 'react'

import AboutRow from './AboutRow'
import ContactRow from './ContactRow'

const About = () => {
	const teamInfo = [
		{ id: 1, name: 'Kelsey Roy', linkedInURL: 'https://www.linkedin.com/in/kelseytroy/', gitHubURL: 'https://github.com/kroy94'}
	]
	return (
		<div className="about__wrapper">
			<div className="about">
				<AboutRow>
					<blockquote cite="https://www.nidcd.nih.gov/health/american-sign-language">
						American Sign Language (ASL) is a complete, natural language that
						has the same linguistic properties as spoken languages, with
						grammar that differs from English. ASL is expressed by movements
						of the hands and face. It is the primary language of many North
						Americans who are deaf and hard of hearing and is used by some
						hearing people as well.
					</blockquote>
					<p>
						National Institute on Deafness and Other Communication Disorders
					</p>
				</AboutRow>
				<AboutRow>
					Bee My Voice uses machine learning to detect hand movements. It was
					built as a Capstone project for the Grace Hopper Program at Fullstack
					Academy.
				</AboutRow>
				{teamInfo.map((developer) => (
					<ContactRow
						key={developer.id}
						developer={developer}
					/>
				))}
			</div>
		</div>
	)
}

export default About
