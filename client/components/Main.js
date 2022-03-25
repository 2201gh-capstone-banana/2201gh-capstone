import React, { useRef, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
// import * as tf from '@tensorflow/tfjs'
// import * as tmImage from '@teachablemachine/image'
// import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
// import { drawFace } from '../utilities/face'
// import { drawPose } from '../utilities/pose'
// import { drawBothHands } from '../utilities/bothHands'
import * as handpose from '@tensorflow-models/handpose'
// import * as poseDetection from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'
// import * as blazeface from '@tensorflow-models/blazeface'
// import { paperGesture } from './phrases/hello-thankyou'
// import { loveYouGesture } from './phrases/iloveyou'
// import { pleaseGesture } from './phrases/please'
// import { youGesture } from './phrases/you'
// import { niceGesture } from './phrases/nice'
import { letters } from './letters'
import PopUp from './PopUp'
/**
 * COMPONENT
 */
// const decideGesture = (gestureName, hand, face, pose) => {
// 	const tipOfIndex = hand[0].landmarks[8]
// 	const tipOfPinky = hand[0].landmarks[20]
// 	// const rightEye = face[0].landmarks[0]
// 	// const mouth = face[0].landmarks[3]
// 	// const shoulder = pose[0].keypoints[5]
// 	if (gestureName === 'hello-thankyou') {
// 		if (
// 			Math.abs(tipOfIndex[0] - mouth[0]) <= 50 &&
// 			tipOfIndex[1] > mouth[1] &&
// 			tipOfPinky[1] < shoulder.y
// 		) {
// 			return 'thank you'
// 		} else if (tipOfIndex[1] < rightEye[1]) {
// 			return 'hello'
// 		} else if (tipOfPinky[1] >= shoulder.y) {
// 			return 'please'
// 		}
// 	} else return gestureName
// }
export const Main = props => {
	const webcamRef = useRef(null)
	// const [turnOnWebcam, setTurnOnWebcam] = useState(false);
	console.log('WEBCAM REF', webcamRef)
	const canvasRef = useRef(null)
	const [translation, setTranslation] = useState(null)

	// const [isDetectRunning, setIsDetectRunning] = useState(false)
	const netRef = useRef(null)
	console.log('NET REF IS THIS:', netRef)
	const handRef = useRef(null)

	useEffect(() => {
		const loadModel = async () => {
			console.log('PLEASE ONLY BE CALLED ONCE')
			const net = await handpose.load()
			netRef.current = net
			// setModel(net);
			webcamInit()
			// const requestanimationframe = window.requestAnimationFrame(loop)
			// requestanimationframe(net);
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
				console.log(
					'this is in the else part of webcam Init, it did not make it through if'
				)
			}
		}

		async function loop() {
			console.log('inside loop')
			await detect(netRef.current)
			window.requestAnimationFrame(loop)
			// const requestanimationframe = window.requestAnimationFrame(loop)
			// requestanimationframe(net)
		}

		//Loop and detect hands

		async function detect(net) {
			// setIsDetectRunning(true);
			console.log('detect function is running...')
			const video = webcamRef.current.video
			// predict can take in an image, video or canvas html element
			//make detections for hand
			const estimationConfig = { flipHorizontal: false }

			const hand = await net.estimateHands(video)

			const ctx = canvasRef.current.getContext('2d')

			drawHand(hand, ctx)
			//make detections for face
			// const returnTensors = false

			if (hand.length > 0) {
				const gestureEstimator = new fp.GestureEstimator([
					...letters.allLetters
					// paperGesture,
					// loveYouGesture,
					// pleaseGesture,
					// youGesture
				])

				// 8 is the confidence level
				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
				console.log('THIS IS THE GESTURE:', gesture)
				if (gesture.gestures && gesture.gestures.length > 0) {
					const score = gesture.gestures.map(prediction => prediction.score)

					const maxScore = score.indexOf(Math.max.apply(null, score))
					const gestureName = gesture.gestures[maxScore].name
					console.log('gestures name is -', gesture.gestures[maxScore].name)

					setTranslation(gestureName)
				}
			} else if (hand.length === 0) {
				setTranslation(null)
				return
			}
			// setIsDetectRunning(false);
		}
		loadModel()
	}, [])

	return (
		<div>
			<div className="container">
				<PopUp />
			</div>
			<Webcam
				ref={webcamRef}
				// onLoad={() => webcamInit()}
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
