import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllLetters } from '../store/letters'
import * as handpose from '@tensorflow-models/handpose'
import '@tensorflow/tfjs-backend-webgl'
import * as fp from 'fingerpose'
import Webcam from 'react-webcam'
import { drawHand } from '../utilities/hand'
import lettersReducer from '../store/letters'
import { letters } from './letters'
import CheatSheet from './CheatSheet'
import CongratsModal from './CongratsModal'
import Loading from './Loading'

function Learning() {
	const allLetterInfo = useSelector(state => state.lettersReducer)
	const letterArr = allLetterInfo.map(letter => letter.letter)
	const dispatch = useDispatch()
	const [currentLetter, setCurrentLetter] = useState(null)
	const [image, setImage] = useState(null)
	const [translation, setTranslation] = useState(null)
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const [congratsModalOpen, setCongratsModalOpen] = useState(false)
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const netRef = useRef(null)
	let timeIntervalBetweenLetters

	//componentWillUpdate equivalent
	useEffect(() => {
		const loop = async () => {
			const reqId = await runHandPose()
			return reqId
		}
		const requestId = loop()

		//	ComponentWillUnmount equivalent
		return async () => {
			clearInterval(await requestId)
			clearTimeout(timeIntervalBetweenLetters)
		}
	}, [currentLetter])

	// ComponentWillUpdate equivalent
	// allLetterInfo.reduce transform arr to obj with key and value pairs
	// [ { letter: 'A', url: 'aa', textUrl: 'AA' }, { letter: 'B', url: 'bb', textUrl: 'BB' }]  ---> { A: [ 'aa', 'AA' ], B: [ 'bb', 'BB' ] }

	useEffect(() => {
		allLetterInfo[0]
			? setTimeout(() => {
					setCurrentLetter('A')
			  }, 1500)
			: ''
		setImage(
			allLetterInfo.reduce((acc, letter) => {
				acc[letter.letter] = [letter.imageUrl, letter.textUrl]
				return acc
			}, {})
		)
	}, [allLetterInfo])

	const runHandPose = async () => {
		const net = await handpose.load()
		let requestId = setInterval(async () => {
			let result = await detect(net)
			if (result === currentLetter) {
				clearInterval(requestId)

				let letterIndex = letterArr.indexOf(currentLetter) + 1

				if (letterIndex < letterArr.length) {
					timeIntervalBetweenLetters = setTimeout(() => {
						setCurrentLetter(letterArr[letterIndex])
					}, 1100)
				} else {
					setTimeout(() => {
						setCongratsModalOpen(true)
					}, 1100)
				}
			}
		}, 100)
		return requestId
	}

	async function detect(net) {
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			//Get video properties
			const video = webcamRef.current.video
			const videoWidth = webcamRef.current.video.videoWidth
			const videoHeight = webcamRef.current.video.videoHeight

			//Set video height and width
			webcamRef.current.video.width = videoWidth
			webcamRef.current.video.height = videoHeight

			//Set canvas height and width
			canvasRef.current.width = videoWidth
			canvasRef.current.height = videoHeight
			const hand = await net.estimateHands(video)
			const ctx = canvasRef.current.getContext('2d')
			drawHand(hand, ctx)

			if (hand.length > 0) {
				const gestureEstimator = new fp.GestureEstimator([...letters.allLetters])

				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)

				if (gesture.gestures && gesture.gestures.length > 0) {
					const score = gesture.gestures.map(prediction => prediction.score)

					const maxScore = score.indexOf(Math.max.apply(null, score))
					const gestureName = gesture.gestures[maxScore].name
					if (gesture.gestures[maxScore].score >= 9) {
						setTranslation(gestureName)
						return gestureName
					}
				}
			}
		}
	}

	return (
		<div className="learning-main">
			<div className="learning-container">
				<button
					id="btn-cheatsheet"
					className="header__link abs"
					onClick={() => {
						setCheatsheetOpen(!cheatsheetOpen)
					}}>
					Cheat Sheet
				</button>
				{!currentLetter && <Loading />}
				{cheatsheetOpen ? (
					<CheatSheet
						cheatsheetOpen={[cheatsheetOpen, setCheatsheetOpen]}
						currentLetter={[currentLetter, setCurrentLetter]}
					/>
				) : null}
			</div>
			<div className="learning-detection">
				{translation ? (
					<div className="learning-translation">Detecting {translation}</div>
				) : null}
			</div>
			{congratsModalOpen && (
				<CongratsModal
					congratsModalOpen={[congratsModalOpen, setCongratsModalOpen]}
				/>
			)}

			<div className="learning-container">
				<Webcam ref={webcamRef} className="learning-webcam" />
				<canvas ref={canvasRef} className="learning-canvas" />

				{image && image[currentLetter] ? (
					<div className="learning-image">
						<img
							src={image[currentLetter][1]}
							className="learning-img-gesture"
						/>
						<img
							src={image[currentLetter][0]}
							className="learning-img-gesture"
						/>
						<div className="learning-checkmark">
							{translation && translation === currentLetter ? (
								<img
									src="checkmark.gif"
									className="learning-img-gesture"
								/>
							) : null}
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}
export default Learning
