import React from 'react'

const AboutRow = props => {
	return (
		<div className="about__row">
			<div className="hexagon about__row-left">
				<img src="https://placehold.jp/350x350.png" alt="" />
			</div>
			<div className="about__row-right">{props.children}</div>
		</div>
	)
}

export default AboutRow
