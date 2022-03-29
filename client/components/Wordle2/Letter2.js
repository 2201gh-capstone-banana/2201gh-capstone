import React, { useState, useContext, useEffect } from 'react'
import { Wordle2Context } from './Wordle2'

const Letter2 = ({ letterPos, attemptVal }) => {
	const { board } = useContext(Wordle2Context)
	const letter = board[attemptVal][letterPos]
	return <div className="letter">{letter}</div>
}

export default Letter2
 