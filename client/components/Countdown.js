import React, { useState, useRef, useEffect } from 'react'

const Countdown = () => {
	const [time, setTime] = useState(60)
	const [isCounting, setIsCounting] = useState(false)

	function countdown() {
		let seconds = time
		let points = 0
		let timer = setInterval(function () {
			seconds--
			if (seconds === 0) {
				console.log(`Game over! Your score is  + ${points}`)

				clearInterval(timer)
				seconds = 60
			}
			setTime(seconds)
			setIsCounting(true)
		}, 1000)
		console.log()
	}
	if (!isCounting) {
		countdown()
	}
	return (
		<>
			<span className="time">{time}</span>
		</>
	)
}

export default Countdown
