import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function CheatSheet(props) {
	let [currentLetter, setCurrentLetter] = props.currentLetter
	let [cheatsheetOpen, setCheatsheetOpen] = props.cheatsheetOpen
	const allLetterInfo = useSelector(state => state.lettersReducer)

	const handleOnClick = event => {
		console.log('being clicked is', event.target.innerText)
		setCurrentLetter(event.target.innerText)
		setCheatsheetOpen(!cheatsheetOpen)
		console.log('new current letter is', currentLetter)
	}
	return (
		<div className="cheat-sheet">
			<div className="container">
				{allLetterInfo.map(ele => (
					<div key={ele.id} className="card">
						<img className="img-cheatsheet" src={ele.imageUrl} />
						<div onClick={handleOnClick}>{ele.letter}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CheatSheet
