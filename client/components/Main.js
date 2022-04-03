import React, { useRef, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
import * as handpose from '@tensorflow-models/handpose'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAcceptedGuesses } from '../store/wordle'

import { letters } from './letters'
import PopUp from './PopUp'
/**
 * COMPONENT
 */

export const Main = props => {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const [translation, setTranslation] = useState(null)
	const [guess, setGuess] = useState(['*', '*', '*', '*', '*'])
	const [timer, setTimer] = useState(3)
	const [acceptedGuess, setAcceptedGuess] = useState('')
	const [isValid, setIsValid] = useState(true)

	const acceptedWordList = ['LLLLL', 'KKKKK']

	const netRef = useRef(null)

	const dispatch = useDispatch()
	const userId = useSelector(state => state.auth.userId)
	useEffect(() => {
		dispatch(fetchAcceptedGuesses(userId))
	}, [])
	// handleGuess(){

	// }
	useEffect(() => {
		const loadModel = async () => {
			const net = await handpose.load()
			netRef.current = net
			setTimeout(() => webcamInit(), 10)
		}

		const webcamInit = () => {
			console.log('webcamInit is running...')
			if (
				webcamRef.current !== 'undefined' &&
				webcamRef.current !== null &&
				webcamRef.current.video.readyState === 4
			) {
				const video = webcamRef.current.video
				const videoWidth = webcamRef.current.video.videoWidth
				const videoHeight = webcamRef.current.video.videoHeight
				// Set video width
				webcamRef.current.video.width = videoWidth
				webcamRef.current.video.height = videoHeight

				//  Set canvas height and width
				canvasRef.current.width = videoWidth
				canvasRef.current.height = videoHeight

				window.requestAnimationFrame(loop)
			} else {
				console.log('Web cam did not initialize')
			}
		}

		async function loop() {
			await detect(netRef.current)
			window.requestAnimationFrame(loop)
		}

		//Loop and detect hands

		async function detect(net) {
			const video = webcamRef.current.video
			// predict can take in an image, video or canvas html element
			//make detections for hand
			const estimationConfig = { flipHorizontal: false }

			const hand = await net.estimateHands(video)
			const ctx = canvasRef.current.getContext('2d')
			drawHand(hand, ctx)

			if (hand.length > 0) {
				const gestureEstimator = new fp.GestureEstimator([...letters.allLetters])

				// 8 is the confidence level
				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
				if (gesture.gestures && gesture.gestures.length > 0) {
					const score = gesture.gestures.map(prediction => prediction.score)

					const maxScore = score.indexOf(Math.max.apply(null, score))
					const gestureName = gesture.gestures[maxScore].name
					setTranslation(gestureName)
					// setTimeout(handleSubmit(), 3000)
				}
			} else if (hand.length === 0) {
				setTranslation(null)
				return
			}
		}
		loadModel()
	}, [])

	useEffect(() => {
		let t
		clearTimeout(t)
		let copyGuessWord = guess.slice()
		if (translation !== null && translation !== 'O') {
			if (translation === 'Q' && !copyGuessWord.includes('*')) {
				if (acceptedWordList.includes(copyGuessWord.join(''))) {
					setTimeout(setAcceptedGuess(copyGuessWord.join('')), 2000)
					setTimeout(setGuess(['*', '*', '*', '*', '*']), 0)
				} else {
					setIsValid(false)
				}
			} else {
				//	const timeIntervalBetweenGuesses = setTimeout(() => { setGuess(translation) }, 3000)
				// if (timer > 0) {
				// 	setInterval(() => {
				// 		timer > 0 ? setTimer(timer - 1) : setTimer('time is up')
				// 	}, 1000)
				// }
				t = setTimeout(() => {
					for (let i = 0; i < 6; i++) {
						if (copyGuessWord[i] === '*') {
							copyGuessWord[i] = translation
							break
						}
					}
				}, 2000)
				setTimeout(setGuess(copyGuessWord), 0)
			}
		} else if (translation === 'O') {
			clearTimeout(t)
			t = setTimeout(() => {
				for (let i = 0; i < 6; i++) {
					if (
						(copyGuessWord[i] !== '*' && copyGuessWord[i + 1] === '*') ||
						i === 4
					) {
						copyGuessWord.splice(i, 1, '*')

						break
					}
				}
			}, 2000)
			setTimeout(setGuess(copyGuessWord), 0)
		}
	}, [translation])
	return (
		<div>
			<div className="container">
				<PopUp />
			</div>
			<Webcam
				ref={webcamRef}
				style={{
					marginRight: 'auto',
					marginLeft: 'auto',
					position: 'absolute',
					zIndex: 9,
					width: 540,
					height: 480,
					backgroundColor: 'black'
				}}
			/>
			<canvas
				ref={canvasRef}
				style={{
					marginLeft: 'auto',
					marginRight: 'auto',
					position: 'absolute',
					textAlign: 'center',
					zIndex: 9,
					width: 540,
					height: 480
				}}
			/>
			<div
				style={{
					backgroundColor: 'pink',
					color: 'black',
					fontSize: 30,

					marginLeft: 600
				}}>
				Detecting:
				{translation}
			</div>
			<div
				style={{
					backgroundColor: 'orange',
					color: 'black',
					fontSize: 30,

					marginLeft: 600
				}}>
				Guessed word is: {guess}
				<div id="timer"></div>
				{!isValid ? <div>Not a valid guess</div> : null}
				<div>Accepted guessed word: {acceptedGuess}</div>
			</div>
		</div>
	)
}
/**
 * CONTAINER
 */
const mapState = state => {
	return {
		username: state.auth.username
	}
}

export default connect(mapState)(Main)
