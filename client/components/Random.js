import React, { useState, useRef, useEffect } from 'react'

const list = [
	// 'ACCOUNT',
	// 'ACCURATE',
	// 'ACRES',
	// 'ACROSS',
	// 'ACT',
	// 'ACTION',
	// 'ACTIVE',
	// 'ACTIVITY'
	'aaaaa',
	'bbbbb',
	'eeeee'
]
const Random = ({ possibleWord, restartWord }) => {
	const [word, setWord] = useState('')

	useEffect(() => {
		console.log(possibleWord)
		console.log(word)
		if (possibleWord === word) {
			restartWord()
			setWord('')
		}
	}, [word])
	useEffect(() => {
		var random = Math.floor(Math.random() * 2) + 0
		setWord(list[random].toLowerCase())
	}, [])
	useEffect(() => {
		if (possibleWord === '' || possibleWord === word) {
			restartWord()
			var random = Math.floor(Math.random() * 2) + 0
			setWord(list[random].toLowerCase())
		}
	}, [possibleWord])
	// function random() {
	// 	return list[random]
	// }

	return <span>{word}</span>
}

export default Random
