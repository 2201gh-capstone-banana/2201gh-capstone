import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function CheatSheet(props) {
	let [currentLetter, setCurrentLetter] = props.currentLetter
	let [cheatsheetOpen, setCheatsheetOpen] = props.cheatsheetOpen
	const allLetterInfo = useSelector(state => state.lettersReducer)

	return (
		<div className="cheat-sheet">
			<div className="container">
				{allLetterInfo.map(ele => (
					<div
						key={ele.id}
						className="card"
						onClick={() => {
							setCurrentLetter(ele.letter)
							setCheatsheetOpen(!cheatsheetOpen)
						}}>
						<img className="img-cheatsheet" src={ele.imageUrl} />
						<div>{ele.letter}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CheatSheet
