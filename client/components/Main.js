import React, { useRef, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
import * as handpose from '@tensorflow-models/handpose'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'

import { letters } from './letters'
/**
 * COMPONENT
 */

export const Main = props => {
	const webcamRef = useRef(null)
	console.log("WEBCAM REF", webcamRef)
	const canvasRef = useRef(null)
	const [translation, setTranslation] = useState(null)
	const netRef = useRef(null);

	useEffect(() => {
		const loadModel = async () => {
			const net = await handpose.load()
			netRef.current = net;
			webcamInit();
		}

		const webcamInit = () => {
			console.log("webcamInit is running...")
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
				console.log("Web cam did not initialize")
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
			drawHand(hand, ctx);


			if (hand.length > 0) {
				const gestureEstimator = new fp.GestureEstimator([
					...letters.allLetters,
				])

				// 8 is the confidence level
				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
				console.log("THIS IS THE GESTURE:", gesture)
				if (gesture.gestures && gesture.gestures.length > 0) {
					const score = gesture.gestures.map(prediction => prediction.score)

					const maxScore = score.indexOf(Math.max.apply(null, score))
					const gestureName = gesture.gestures[maxScore].name
					setTranslation(gestureName)
				}

			} else if (hand.length === 0) {
				setTranslation(null)
				return
			}
		}
		loadModel();
	}, [])

	return (

		<div>
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
					backgroundColor: 'red',
					color: 'black',
					fontSize: 30,

					marginLeft: 600
				}}>
				{translation}
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
