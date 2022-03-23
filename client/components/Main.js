import React, { useRef, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
import { drawFace } from '../utilities/face'
import { drawPose } from '../utilities/pose'
import { drawBothHands } from '../utilities/bothHands'
import * as handpose from '@tensorflow-models/handpose'
import * as poseDetection from '@tensorflow-models/pose-detection'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'
import * as blazeface from '@tensorflow-models/blazeface'
import { paperGesture } from './phrases/hello-thankyou'
import { loveYouGesture } from './phrases/iloveyou'
import { pleaseGesture } from './phrases/please'
import { youGesture } from './phrases/you'
import { niceGesture } from './phrases/nice'
import { letters } from './letters'
/**
 * COMPONENT
 */
const decideGesture = (gestureName, hand, face, pose) => {
	const tipOfIndex = hand[0].landmarks[8]
	const tipOfPinky = hand[0].landmarks[20]
	const rightEye = face[0].landmarks[0]
	const mouth = face[0].landmarks[3]
	const shoulder = pose[0].keypoints[5]
	if (gestureName === 'hello-thankyou') {
		if (
			Math.abs(tipOfIndex[0] - mouth[0]) <= 50 &&
			tipOfIndex[1] > mouth[1] &&
			tipOfPinky[1] < shoulder.y
		) {
			return 'thank you'
		} else if (tipOfIndex[1] < rightEye[1]) {
			return 'hello'
		} else if (tipOfPinky[1] >= shoulder.y) {
			return 'please'
		}
	} else return gestureName
}
export const Main = props => {
	const webcamRef = useRef(null)
	// const [webcam, setWebcam] = useState(null)
	console.log("WEBCAM REF", webcamRef)
	const canvasRef = useRef(null)
	const [translation, setTranslation] = useState(null)

	const loadModel = async () => {
		// const model = await tmImage.load(checkpointURL, metadataURL)
		const net = await handpose.load()

		const netFace = await blazeface.load()
		//pose
		const detectorConfig = {
			architecture: 'MobileNetV1',
			outputStride: 16,
			inputResolution: { width: 640, height: 480 },
			multiplier: 0.75
		}
		const netPose = await poseDetection.createDetector(
			poseDetection.SupportedModels.PoseNet,
			detectorConfig
		)

		//both hands detection
		const modelBothHands = handPoseDetection.SupportedModels.MediaPipeHands
		const detectorConfigBothHands = {
			runtime: 'tfjs',
			modelType: 'full'
		}
		const netBothHands = await handPoseDetection.createDetector(
			modelBothHands,
			detectorConfigBothHands
		)
		console.log('net both hands', netBothHands)
		console.log('pose detector ', netPose)

		console.log('net', net.pipeline.maxHandsNumber)

		// setInterval(() => {
		// 	detect(model, net, netFace, netPose, netBothHands)
		// 	//this function is being called so quickly, you want to make it as optimized
		// 	//as possible
		// 	//"the fact you're using a setInterval could be a problem"
		// 	//it's asynchronous, so it's possible that two detects can happen at the same time.
		// 	//detect function sets a state on the component that says detection is happening.
		// 	//when detect function is completed you change that state back to false
		// 	//so you can create a gaurd that prevents another detect function
		// 	//request animation frame
		// 	//if resources are available, and I can perform this function.
		// 	//Window.requestAnimationFrame(detect())
		// 	//then within detect, call this again. sort of recursive for detect
		// 	//this means that the detect funtions are less likely to overlap with each other
		// }, 100)
	}

	const webcamInit = () => {
		console.log("this is at the top of webcam init")
		console.log("webcamRef.current", webcamRef.current)
		console.log("Is webcamRef null?", webcamRef.current === null)
		console.log("Is webcamRef undefined?", webcamRef.current === 'undefined')
		console.log("Is webcamRef readystate = 4?", webcamRef.current.video.readyState === 4)
		if (
			// typeof webcamRef !== 'undefined' &&
			webcamRef !== null &&
			webcamRef.current.video.readyState === 4
		) {

			//we don't need to use this every time we call detect. maybe we should move this outside
			//of the detect function context.
			//go through this code and ensure that everything is actually something we have to redo
			//in order to detect. if not, we can find a way to do it once in load model, keep
			//a reference using useRef, and use reference to it.
			// Get Video Properties
			const video = webcamRef.current.video
			const videoWidth = webcamRef.current.video.videoWidth
			const videoHeight = webcamRef.current.video.videoHeight
			console.log("video", video)
			// Set video width
			webcamRef.current.video.width = videoWidth
			webcamRef.current.video.height = videoHeight

			//  Set canvas height and width
			canvasRef.current.width = videoWidth
			canvasRef.current.height = videoHeight

			console.log("this is before requestanimationframe")

			window.requestAnimationFrame(loop)
		} else {
			console.log("this is in the else part of webcam Init, it did not make it through if")
		}
	}

	async function loop() {
		console.log('inside loop')
		await detect()
		window.requestAnimationFrame(loop)
	}

	//Loop and detect hands

	async function detect(model, net, netFace, netPose, netBothHands) {
		console.log("this is placed at the top of detect")
		// predict can take in an image, video or canvas html element
		//make detections for hand
		const estimationConfig = { flipHorizontal: false }
		// const bothHands = await netBothHands.estimateHands(video, estimationConfig)
		// const net = await handpose.load()

		const hand = await net.estimateHands(video)
		console.log("THIS IS HAND -->", hand)
		//make detections for face
		const returnTensors = false
		// const face = await netFace.estimateFaces(video, returnTensors)

		// const pose = await netPose.estimatePoses(video)

		//this grabbing of the 2d context, this shouldn't need to be done more than once.
		//you should be able to grab context and have reference to it, and use it in
		//every detect call. we're doing this often enough to make it matter.
		//want to dig through detect code and sus out whether everything we're doing
		//in detect code absolutely needed
		//draw mesh
		const ctx = canvasRef.current.getContext('2d')

		drawHand(hand, ctx);
		// drawBothHands(bothHands, ctx)
		// drawFace(face, ctx)
		// drawPose(pose, ctx)
		// if (bothHands.length === 2) {
		//   console.log("get inside both hands???");
		//   const gestureEstimatorForBothHand = new fp.GestureEstimator([
		//     niceGesture,
		//   ]);
		//   const gestureLeftHand = await gestureEstimatorForBothHand.estimate(
		//     bothHands[0].keypoints,
		//     8
		//   );
		//   console.log("gesture left hand is", gestureLeftHand);
		//   const gestureRightHand = await gestureEstimatorForBothHand.estimate(
		//     bothHands[1].keypoints,
		//     8
		//   );
		//   console.log("gesture right hand is", gestureRightHand);
		//   if (gestureLeftHand.gestures && gestureRightHand.gestures) {
		//     if (
		//       gestureLeftHand.gestures[0].name === "nice" &&
		//       gestureRightHand.gestures[0].name === "nice"
		//     ) {
		//       setTranslation("nice");
		//     }
		//   }
		//   //make detections for hands and finger gestures
		// }

		if (hand.length > 0) {
			const gestureEstimator = new fp.GestureEstimator([
				...letters.allLetters,
				paperGesture,
				loveYouGesture,
				pleaseGesture,
				youGesture
			])

			// 8 is the confidence level
			const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
			if (gesture.gestures && gesture.gestures.length > 0) {
				const score = gesture.gestures.map(prediction => prediction.score)

				const maxScore = score.indexOf(Math.max.apply(null, score))
				const gestureName = gesture.gestures[maxScore].name
				console.log('gestures name is -', gesture.gestures[maxScore].name)

				const result = decideGesture(gestureName, hand, face, pose)
				console.log('result is ---', result)
				setTranslation(result)
			}
		} else if (hand.length === 0) {
			setTranslation(null)
			return
		}
	}

	useEffect(() => {
		loadModel()
		console.log('first use effect')
		// webcamInit()
		// console.log('after webcam init')
	}, [])

	// useEffect(() => {
	// 	console.log('UseEffect for webcam Init called');
	// 	webcamInit();
	// 	console.log('UseEffect for webcam Init finished');
	// 	console.log("webcam ref is equal to:",webcamRef)
	// }, [webcamRef])
	useCallback(() => {
		console.log('UseEffect for webcam Init called');
		webcamInit();
		console.log('UseEffect for webcam Init finished');
		console.log("webcam ref is equal to:", webcamRef)
	}, [webcamRef])


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
