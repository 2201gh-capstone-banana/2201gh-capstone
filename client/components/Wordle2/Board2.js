import React, { useState } from 'react'

import Letter2 from './Letter2'

const Board2 = () => {
	
	return (
		<div className="board">
			<div className="row">
				<Letter2 letterPos={0} attemptVal={0} />
				<Letter2 letterPos={1} attemptVal={0} />
				<Letter2 letterPos={2} attemptVal={0} />
				<Letter2 letterPos={3} attemptVal={0} />
				<Letter2 letterPos={4} attemptVal={0} />
			</div>
			<div className="row">
				<Letter2 letterPos={0} attemptVal={1} />
				<Letter2 letterPos={1} attemptVal={1} />
				<Letter2 letterPos={2} attemptVal={1} />
				<Letter2 letterPos={3} attemptVal={1} />
				<Letter2 letterPos={4} attemptVal={1} />
			</div>
			<div className="row">
				<Letter2 letterPos={0} attemptVal={2} />
				<Letter2 letterPos={1} attemptVal={2} />
				<Letter2 letterPos={2} attemptVal={2} />
				<Letter2 letterPos={3} attemptVal={2} />
				<Letter2 letterPos={4} attemptVal={2} />
			</div>
			<div className="row">
				<Letter2 letterPos={0} attemptVal={3} />
				<Letter2 letterPos={1} attemptVal={3} />
				<Letter2 letterPos={2} attemptVal={3} />
				<Letter2 letterPos={3} attemptVal={3} />
				<Letter2 letterPos={4} attemptVal={3} />
			</div>
			<div className="row">
				<Letter2 letterPos={0} attemptVal={4} />
				<Letter2 letterPos={1} attemptVal={4} />
				<Letter2 letterPos={2} attemptVal={4} />
				<Letter2 letterPos={3} attemptVal={4} />
				<Letter2 letterPos={4} attemptVal={4} />
			</div>
			<div className="row">
				<Letter2 letterPos={0} attemptVal={5} />
				<Letter2 letterPos={1} attemptVal={5} />
				<Letter2 letterPos={2} attemptVal={5} />
				<Letter2 letterPos={3} attemptVal={5} />
				<Letter2 letterPos={4} attemptVal={5} />
			</div>
		</div>
	)
}

export default Board2
