import React, { useRef, useEffect, useCallback } from 'react'
import { WordleAppContext } from './WordleApp'
import { useSpring, animated } from 'react-spring'
import { useSelector, useDispatch } from 'react-redux'

const InstructionModal = props => {
	const modalRef = useRef()

	return props.trigger ? (
		<div className="modalBackground" onClick={() => props.setTrigger(false)}>
			<div className="modalContainer">
				<div className="x-container">
					<button className="modalbtn" onClick={() => props.setTrigger(false)}>
						X
					</button>
				</div>
				<div class="instructions">
					<p>
						Guess the <strong>WORDLE</strong> in six tries.
					</p>
					<p>
						Each guess must be a valid five-letter word.
						<p>
							Hold your hand up to the camera and click to capture the
							letter. Make thumb down gesture for deleting. And click submit
							when ready.
						</p>
					</p>
					<p>
						After each guess, the color of the tiles will change to show how
						close your guess was to the word.
					</p>
					<div class="examples">
						<p>
							<strong>Examples</strong>
						</p>
						<div class="example">
							<div class="row">
								<span className="row_letter row_green">W</span>
								<span className="row_letter">E</span>
								<span className="row_letter">A</span>
								<span className="row_letter">R</span>
								<span className="row_letter">Y</span>
							</div>
							<p>
								The letter <strong>W</strong> is in the word and in the
								correct spot.
							</p>
						</div>
						<div class="example">
							<div class="row">
								<span className="row_letter">P</span>
								<span className="row_letter row_yellow">I</span>
								<span className="row_letter">L</span>
								<span className="row_letter">L</span>
								<span className="row_letter">S</span>
							</div>
							<p>
								The letter <strong>I</strong> is in the word but in the
								wrong spot.
							</p>
						</div>
						<div class="example">
							<div class="row">
								<span className="row_letter">V</span>
								<span className="row_letter">A</span>
								<span className="row_letter">G</span>
								<span className="row_letter row_grey">U</span>
								<span className="row_letter">E</span>
							</div>
							<p>
								The letter <strong>U</strong> is not in the word in any
								spot.
							</p>
						</div>
					</div>
					<p>
						{/* <strong>
							A new WORDLE will be available each day!<strong></strong>
						</strong> */}
					</p>
					<strong>
						<strong></strong>
					</strong>
				</div>
			</div>
		</div>
	) : (
		''
	)
}

export default InstructionModal
