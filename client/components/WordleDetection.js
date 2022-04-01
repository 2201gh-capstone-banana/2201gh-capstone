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
	const canvasRef = useRef(null)
	const [timer, setTimer] = useState(3)
	const [finalAns, setFinalAns] = useState([])



	const netRef = useRef(null)

	useEffect(() => {
		const loadModel = async () => {
			try {
				const net = await handpose.load()
				netRef.current = net
				// setTimeout(() => webcamInit(), 100)
				await webcamInit();
			} catch (error) {
				throw (error);
			}
		}
		const webcamInit = () => new Promise((resolve, reject) => {
			const checkIfReady = () => {

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
					resolve('Web cam initialized');
				} else {
					// console.log('Web cam did not initialize')
					console.log('called but not resolved');
					window.requestAnimationFrame(checkIfReady);
					// reject("Web cam did not initialize");
				}
			}
			window.requestAnimationFrame(checkIfReady);
			// setTimeout(checkIfReady, 100);
		})

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
		// window.location.reload();
	}, [])


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
