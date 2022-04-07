import React from 'react'

import AboutRow from './AboutRow'
import ContactRow from './ContactRow'

const About = () => {
	const teamInfo = [
		{
			id: 1,
			name: 'Kelsey Roy',
			linkedInURL: 'https://www.linkedin.com/in/kelseytroy/',
			gitHubURL: 'https://github.com/kroy94',
			bitmoji: 'kelsey-bitmoji.png'
		},
		{
			id: 2,
			name: 'Anh Kaia Duong',
			linkedInURL: 'https://www.linkedin.com/in/anh-kaia-duong/',
			gitHubURL: 'https://github.com/AnaniaDuo',
			bitmoji: 'kaia-bitmoji.png'
		},
		{
			id: 3,
			name: 'Amber Lin',
			linkedInURL: 'https://www.linkedin.com/in/amberlin97/',
			gitHubURL: 'https://github.com/amberlinyq',
			bitmoji: 'amber-bitmoji.png'
		}
	]
	return (
		<div className="about__wrapper">
			<div className="about">
				<AboutRow img="ASL3.png">
					<blockquote cite="https://www.nidcd.nih.gov/health/american-sign-language">
						<p className="about-p">
							American Sign Language (ASL) is a complete, natural language
							that has the same linguistic properties as spoken languages,
							with grammar that differs from English. ASL is expressed by
							movements of the hands and face. It is the primary language of
							many North Americans who are deaf and hard of hearing and is
							used by some hearing people as well.
						</p>
					</blockquote>
					{/* <p>
						National Institute on Deafness and Other Communication Disorders
					</p> */}
				</AboutRow>
				<AboutRow img="beeLogo.png" id="bmv-about">
					<p className="about-p">
						Be My Voice is an instructional web app designed to teach its
						users the basics of American Sign Language, or ASL. The idea for
						Be My Voice started as a translation app, however through the
						course of its development it has morphed into an EdTech web app
						that includes a Lesson Center for those who want to learn ASL, and
						a Game Center for those interested in practicing their newly
						acquired ASL skills in a fun and interactive setting.
					</p>
				</AboutRow>
				<AboutRow img="tech.jpg">
					<p className="about-p">
						Be My Voice was built with Node.js, Express, and Sequelize on the
						server. For the front-end client side, we used React, Redux, and
						JavaScript. The Tensorflow.js Hand Pose Detection model was used
						to assess and translate ASL signs in real-time and react-webcam
						was used for hand pose detection.
					</p>
				</AboutRow>
				<br />
				<br />
				<div id="team-info">
					<h2>Meet the Team: </h2>
					{teamInfo.map(developer => (
						<ContactRow key={developer.id} developer={developer} />
					))}
				</div>
			</div>
		</div>
	)
}

export default About
