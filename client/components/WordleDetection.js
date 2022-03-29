import React, { useRef, useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
import * as handpose from '@tensorflow-models/handpose'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'
import { WordleAppContext } from './WordleApp'
import { letters } from './letters'
import deleteGesture from './phrases/delete'
import PopUp from './PopUp'
/*
 * COMPONENT
 */

export const WordleDetection = () => {
	const { board, setBoard, translation, setTranslation } = useContext(WordleAppContext)
	const webcamRef = useRef(null)
	console.log('WEBCAM REF', webcamRef)
	const canvasRef = useRef(null)
	// const [translation, setTranslation] = useState(null)
	// const allAcceptedGuesses = useSelector(state => state.wordle)

	//find the first row index that include ""
	// const currentRowToGuess = arr => {
	// 	for (let i = 0; i < arr.length; i++) {
	// 		if (arr[i].cells.includes('')) {
	// 			console.log(i)
	// 			return i
	// 		}
	// 	}
	// }
	// const currentRow = currentRowToGuess(allAcceptedGuesses)
	// const [guess, setGuess] = useState(['*', '*', '*', '*', '*'])
	//const [guess, setGuess] = useState(allAcceptedGuesses[currentRow].cells)
	const [timer, setTimer] = useState(3)
	const [finalAns, setFinalAns] = useState([])
	// console.log('CURRENT ROW IS', currentRow)

	// useEffect(() => {
	// 	console.log('GET TO USE EFFECT')
	// 	const newBoard = board.map(ele => (ele.id === currentRow ? guess : ele))
	// 	setBoard(newBoard)
	// 	console.log('NEW BOARD---', newBoard)
	// }, [guess])


	const netRef = useRef(null)

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
				const gestureEstimator = new fp.GestureEstimator([...letters.allLetters, deleteGesture])

				// 8 is the confidence level
				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
				console.log('THIS IS THE GESTURE:', gesture)
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

	// console.log('TRANSLATION IS ---', translation)

	// console.log('new guess is', guess)
	return (
		<div className="webcam-detection">
			<Webcam ref={webcamRef} className="webcam" />
			<canvas ref={canvasRef} className="canvas" />
		</div>
	)
}
/*
 * CONTAINER
 */
// const mapState = state => {
// 	return {
// 		username: state.auth.username
// 	}
// }

export default WordleDetection
