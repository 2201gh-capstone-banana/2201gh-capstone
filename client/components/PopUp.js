import React, { useState } from 'react'

function PopUp() {
	const [popUpOpen, setPopUpOpen] = useState(true)
	let result
	popUpOpen
		? (result = (
				<div className="cheat-sheet">
					<div className="x-container">
						<button className="x-popup" onClick={() => setPopUpOpen(false)}>
							X
						</button>
					</div>

					<h1>Pop-up</h1>

					<p>this is the instruction to play the game</p>
					<p>this is the instruction to play the game</p>
					<p>this is the instruction to play the game</p>
					<p>this is the instruction to play the game</p>
					<p>this is the instruction to play the game</p>
				</div>
		  ))
		: (result = null)
	return result
}

export default PopUp
