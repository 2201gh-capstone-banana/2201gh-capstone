import React, { useContext } from 'react'
import { Wordle2Context } from './Wordle2'

function Key2({ keyVal, bigKey }) {
	const {
		board,
		setBoard,
		currAttempt,
		setCurrAttempt,
		onSelectLetter,
		onDelete,
		onEnter
	} = useContext(Wordle2Context)

	const selectLetter = () => {
		if (keyVal === 'ENTER') {
			onEnter()
		} else if (keyVal === 'DELETE') {
			onDelete()
		} else {
			onSelectLetter(keyVal)
		}
	}

	return (
		<div className="key" id={bigKey && 'big'} onClick={selectLetter}>
			{keyVal}
		</div>
	)
}

export default Key2
