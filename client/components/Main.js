import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
import * as handpose from '@tensorflow-models/handpose'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'
import { aSign } from './letters/letterA'
import { bSign } from './letters/letterB'
import { cSign } from './letters/letterC'
import { dSign } from './letters/letterD'
import { eSign } from './letters/letterE'
import { fSign } from './letters/letterF'
import { gSign } from './letters/letterG'
import { hSign } from './letters/letterH'
import { iSign } from './letters/letterI'

export const Home = props => {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const [translation, setTranslation] = useState(null)
	const [word, setWord] = useState(null)

	const runHandpose = async () => {
		const net = await handpose.load()
		console.log('Handpose model loaded.')
		//  Loop and detect hands
		setInterval(() => {
			detect(net)
		}, 1000)
	}
	const array = []
	async function detect(net) {
		// predict can take in an image, video or canvas html element

		if (
			typeof webcamRef.current !== 'undefined' &&
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
			//make detections for hand
			const hand = await net.estimateHands(video)

			if (hand.length > 0) {
				const gestureEstimator = new fp.GestureEstimator([
					aSign,
					bSign,
					cSign,
					dSign,
					eSign,
					fSign,
					gSign,
					hSign,
					iSign
				])

				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 4)
				console.log('gesture is ', gesture)
				if (gesture.gestures && gesture.gestures.length > 0) {
					const score = gesture.gestures.map(prediction => prediction.score)

					const maxScore = score.indexOf(Math.max.apply(null, score))
					const gestureName = gesture.gestures[maxScore].name
					console.log('gestures name is -', gesture.gestures[maxScore].name)

					array.push(gestureName)
					console.log('array=====', array)
					let result=array.join('')
					console.log('result=====', result)
					setTranslation(gestureName)
					setWord(result)
				}
			}
			const ctx = canvasRef.current.getContext('2d')
			drawHand(hand, ctx)
		}
	}
	useEffect(() => {
		runHandpose()
	}, [])
	console.log('translation====', translation)
	console.log('word=====', word)
	return (
		<div>
			<h1>Online translator </h1>
			<h2>Letter:{translation} </h2>
			<h2>Word:{word} </h2>

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
		</div>
	)
}

const mapState = state => {
	return {
		username: state.auth.username
	}
}

export default connect(mapState)(Home)
