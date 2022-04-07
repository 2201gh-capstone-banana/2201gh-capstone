import React from 'react'

const AboutRow = props => {
	const { img } = props
	return (
		<div className="about__row">
			<div className="hexagon about__row-left">
				<img src={img} alt="" />
			</div>
			<div className="about__row-right">{props.children}</div>
		</div>
	)
}

export default AboutRow
