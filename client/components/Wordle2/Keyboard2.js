import React, { useEffect, useContext, useCallback } from 'react'
import Key2 from './Key2'
import { Wordle2Context } from './Wordle2'

const Keyboard2 = props => {
	const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
	const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
	const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	console.log('props in keyboard=====', props)
	const {
		board,
		setBoard,
		currAttempt,
		setCurrAttempt,
		onSelectLetter,
		onDelete,
		onEnter,
		setDisabledLetters,
		disabledLetters,
		gameOver
	} = useContext(Wordle2Context)

	const handleKeyboard = useCallback(
		event => {
			if (props.transaltion) {
				event.key = props.transaltion
			}
			if (gameOver.gameOver) return
			if (event.key === 'Enter') {
				onEnter()
			} else if (event.key === 'Backspace') {
				onDelete()
			} else {
				keys1.forEach(key => {
					if (event.key.toLowerCase() === key.toLowerCase()) {
						onSelectLetter(key)
					}
				})
				keys2.forEach(key => {
					if (event.key.toLowerCase() === key.toLowerCase()) {
						onSelectLetter(key)
					}
				})
				keys3.forEach(key => {
					if (event.key.toLowerCase() === key.toLowerCase()) {
						onSelectLetter(key)
					}
				})
			}
		},
		[currAttempt]
	)

	useEffect(() => {}, [handleKeyboard])

	console.log(disabledLetters)
	return (
		<div className="keyboard" onKeyDown={handleKeyboard}>
			<div className="line1">
				{keys1.map(key => {
					return <Key2 keyVal={key} disabled={disabledLetters.includes(key)} />
				})}
			</div>
			<div className="line2">
				{keys2.map(key => {
					return <Key2 keyVal={key} disabled={disabledLetters.includes(key)} />
				})}
			</div>
			<div className="line3">
				<Key2 keyVal={'ENTER'} bigKey />
				{keys3.map(key => {
					return <Key2 keyVal={key} disabled={disabledLetters.includes(key)} />
				})}
				<Key2 keyVal={'DELETE'} bigKey />
			</div>
		</div>
	)
}

export default Keyboard2
