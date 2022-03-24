import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Routes from './Routes'
import '../css/index.css'
import { fetchAllLetters } from './store/letters'

const App = () => {
	const dispatch = useDispatch()
	//componentDidMount equivalent
	useEffect(() => {
		dispatch(fetchAllLetters())
	}, [])

	const allLetterInfo = useSelector(state => state.lettersReducer)
	console.log('all letter info', allLetterInfo)
	return (
		<div>
			<Routes />
		</div>
	)
}
export default App
