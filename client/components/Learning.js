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

function Learning() {
	const allLetterInfo = useSelector(state => state.lettersReducer)
	console.log('all letter info', allLetterInfo)
	const letterArr = allLetterInfo.map(letter => letter.letter)
	const dispatch = useDispatch()
	const [currentLetter, setCurrentLetter] = useState(null)
	const [image, setImage] = useState(null)
	const [translation, setTranslation] = useState(null)
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const netRef = useRef(null)
	let timeIntervalBetweenLetters

	//componentDidMount equivalent
	// useEffect(() => {
	// 	dispatch(fetchAllLetters())
	// }, [])

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
		// allLetterInfo[0] ? setCurrentLetter(allLetterInfo[0].letterwords) : ''
		allLetterInfo[0] ? setCurrentLetter('A') : ''
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

				console.log('THIS IS THE GESTURE:', gesture)
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
	console.log('image is ---', image)

	console.log('current letter is----', currentLetter)
	image && image[currentLetter]
		? console.log('new image is', image[currentLetter][0])
		: console.log('nothing')
	return (
		<div className="App">
			<header className="App-header">
				<div className="container">
					<button
						id="btn-cheatsheet"
						className="header__link"
						onClick={() => {
							setCheatsheetOpen(!cheatsheetOpen)
						}}>
						Cheat Sheet
					</button>
					{cheatsheetOpen ? (
						<CheatSheet
							cheatsheetOpen={[cheatsheetOpen, setCheatsheetOpen]}
							currentLetter={[currentLetter, setCurrentLetter]}
						/>
					) : null}
				</div>

				<Webcam
					ref={webcamRef}
					className=" bg-yellow-300 border-4 border-gray-600"
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '2%',

						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 900,
						height: 600
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '8%',

						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 900,
						height: 600
					}}
				/>

				{image && image[currentLetter] ? (
					<div>
						<img
							src={image[currentLetter][0]}
							style={{
								position: 'relative',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: 30,
								bottom: '-20vh',
								right: 100,
								textAlign: 'center',
								height: 100
							}}
						/>
						<img
							src={image[currentLetter][1]}
							style={{
								position: 'relative',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: -100,
								bottom: '-10vh',
								right: 100,
								textAlign: 'center',
								height: 100
							}}
						/>
					</div>
				) : null}

				{translation === currentLetter ? (
					<img
						src="checkmark.gif"
						style={{
							position: 'relative',
							marginLeft: 'auto',
							marginRight: 'auto',
							left: 110,
							right: 0,
							textAlign: 'center',
							height: 100
						}}
					/>
				) : null}
			</header>
			{translation ? (
				<div
					style={{
						fontSize: 30,
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						top: '90vh',
						textAlign: 'center',
						height: '10%',
						width: '40%'
					}}>
					Detecting {translation}
				</div>
			) : null}
		</div>
	)
}
export default Learning

//----------------------------------------------------
// An attempt to use window.requestAnimationFrame
// import React, { useRef, useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchAllLetters } from '../store/letters'
// import * as handpose from '@tensorflow-models/handpose'
// import '@tensorflow/tfjs-backend-webgl'
// import * as fp from 'fingerpose'
// import Webcam from 'react-webcam'
// import { drawHand } from '../utilities/hand'
// import letters from '../store/letters'

// function Learning() {
//  const allLetterInfo = useSelector(state => state.letters) || []
//  console.log('all letter info', allLetterInfo)
//  const letterArr = allLetterInfo.map(letter => letter.letter)
//  const dispatch = useDispatch()
//  const [currentLetter, setCurrentLetter] = useState(null)
//  const [image, setImage] = useState(null)
//  const [translation, setTranslation] = useState(null)
//  const webcamRef = useRef(null)
//  const canvasRef = useRef(null)
//  const netRef = useRef(null)
//  let timeIntervalBetweenLetters

//  //componentDidMount equivalent
//  useEffect(() => {
//    console.log('FETCH LETTERS')
//    dispatch(fetchAllLetters())
//    const loadModel = async () => {
//      const net = await handpose.load()
//      netRef.current = net
//      webcamInit()
//    }
//    function webcamInit() {
//      if (
//        webcamRef.current !== 'undefined' &&
//        webcamRef.current !== null &&
//        webcamRef.current.video.readyState === 4
//      ) {
//        const video = webcamRef.current.video
//        const videoWidth = webcamRef.current.video.videoWidth
//        const videoHeight = webcamRef.current.video.videoHeight
//        // Set video width
//        webcamRef.current.video.width = videoWidth
//        webcamRef.current.video.height = videoHeight

//        //  Set canvas height and width
//        canvasRef.current.width = videoWidth
//        canvasRef.current.height = videoHeight

//        window.requestAnimationFrame(loop)
//      } else {
//        console.log(
//          'this is in the else part of webcam Init, it did not make it through if'
//        )
//      }
//    }

//    async function loop() {
//      const result = await detect(netRef.current)
//      let requestId = window.requestAnimationFrame(loop)
//      if (result === currentLetter) {
//        window.cancelAnimationFrame(requestId)

//        let letterIndex = letterArr.indexOf(currentLetter) + 1

//        if (letterIndex < letterArr.length) {
//          timeIntervalBetweenLetters = setTimeout(() => {
//            setCurrentLetter(letterArr[letterIndex])
//          }, 3000)
//        }
//      }
//      return requestId
//    }

//    async function detect(net) {
//      const video = webcamRef.current.video
//      const hand = await net.estimateHands(video)
//      const ctx = canvasRef.current.getContext('2d')
//      drawHand(hand, ctx)

//      if (hand.length > 0) {
//        const gestureEstimator = new fp.GestureEstimator([...letters.allLetters])

//        const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
//        console.log('THIS IS THE GESTURE:', gesture)
//        if (gesture.gestures && gesture.gestures.length > 0) {
//          const score = gesture.gestures.map(prediction => prediction.score)

//          const maxScore = score.indexOf(Math.max.apply(null, score))
//          const gestureName = gesture.gestures[maxScore].name
//          if (gesture.gestures[maxScore].score >= 9) {
//            setTranslation(gestureName)
//            return gestureName
//          }
//        }
//      }
//    }
//  }, [])

//  // //componentWillUpdate equivalent
//  // useEffect(() => {
//  //  const loop = async () => {
//  //    const reqId = await loop()
//  //    return reqId
//  //  }
//  //  const requestId = loop()

//  //  //ComponentWillUnmount equivalent
//  //  return async () => {
//  //    window.cancelAnimationFrame(requestId)
//  //    clearTimeout(timeIntervalBetweenLetters)
//  //  }
//  // }, [currentLetter])

//  // ComponentWillUpdate equivalent
//  // allLetterInfo.reduce transform arr to obj with key and value pairs
//  // [ { letter: 'A', url: 'aa', textUrl: 'AA' }, { letter: 'B', url: 'bb', textUrl: 'BB' }]  ---> { A: [ 'aa', 'AA' ], B: [ 'bb', 'BB' ] }

//  useEffect(() => {
//    allLetterInfo[0] ? setCurrentLetter(allLetterInfo[0].letterwords) : ''
//    setImage(
//      allLetterInfo.reduce((acc, letter) => {
//        acc[letter.letter] = [letter.imageUrl, letter.textUrl]
//        return acc
//      }, {})
//    )
//  }, [allLetterInfo])

//  console.log('image is ---', image)
//  return (
//    <div className="App">
//      <header className="App-header">
//        <Webcam
//          ref={webcamRef}
//          className=" bg-yellow-300 border-4 border-gray-600"
//          style={{
//            position: 'absolute',
//            marginLeft: 'auto',
//            marginRight: 'auto',
//            marginTop: '8%',

//            left: 0,
//            right: 0,
//            textAlign: 'center',
//            zindex: 9,
//            width: 900,
//            height: 600
//          }}
//        />
//        <canvas
//          ref={canvasRef}
//          style={{
//            position: 'absolute',
//            marginLeft: 'auto',
//            marginRight: 'auto',
//            marginTop: '8%',

//            left: 0,
//            right: 0,
//            textAlign: 'center',
//            zindex: 9,
//            width: 900,
//            height: 600
//          }}
//        />

//        {image && image[currentLetter] ? (
//          <div>
//            <img
//              src={image[currentLetter][0]}
//              style={{
//                position: 'relative',
//                marginLeft: 'auto',
//                marginRight: 'auto',
//                left: 30,
//                bottom: '-20vh',
//                right: 100,
//                textAlign: 'center',
//                height: 100
//              }}
//            />
//            <img
//              src={image[currentLetter][1]}
//              style={{
//                position: 'relative',
//                marginLeft: 'auto',
//                marginRight: 'auto',
//                left: -100,
//                bottom: '-10vh',
//                right: 100,
//                textAlign: 'center',
//                height: 100
//              }}
//            />
//          </div>
//        ) : null}

//        {translation === currentLetter ? (
//          <img
//            src="checkmark.gif"
//            style={{
//              position: 'relative',
//              marginLeft: 'auto',
//              marginRight: 'auto',
//              left: 110,
//              right: 0,
//              textAlign: 'center',
//              height: 100
//            }}
//          />
//        ) : null}
//      </header>
//      {translation ? (
//        <div
//          style={{
//            fontSize: 30,
//            position: 'absolute',
//            marginLeft: 'auto',
//            marginRight: 'auto',
//            left: 0,
//            right: 0,
//            top: '90vh',
//            textAlign: 'center',
//            height: '10%',
//            width: '40%'
//          }}>
//          Detecting {translation}
//        </div>
//      ) : null}
//    </div>
//  )
// }
// export default Learning

/*
	const allLetterInfo = useSelector(state => state.letters) || []
	console.log('all letter info', allLetterInfo)
	const letterArr = allLetterInfo.map(letter => letter.letter)
	// const dispatch = useDispatch()
	const [currentLetter, setCurrentLetter] = useState(null)
	const [image, setImage] = useState(null)
	const [translation, setTranslation] = useState(null)
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const netRef = useRef(null)
	let timeIntervalBetweenLetters
	// const {allLetterInfo, letters} = useContext(LettersContext)
	//componentDidMount equivalent
	useEffect(() => {
		console.log('FETCH LETTERS')
		dispatch(fetchAllLetters())
		const loadModel = async () => {
			const net = await handpose.load()
			netRef.current = net
			webcamInit()
		}
		function webcamInit() {
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
			const result = await detect(netRef.current)
			let requestId = window.requestAnimationFrame(loop)
			if (result === currentLetter) {
				window.cancelAnimationFrame(requestId)
				let letterIndex = letterArr.indexOf(currentLetter) + 1
				if (letterIndex < letterArr.length) {
					timeIntervalBetweenLetters = setTimeout(() => {
						setCurrentLetter(letterArr[letterIndex])
					}, 3000)
				}
			}
			return requestId
		}
		async function detect(net) {
			const video = webcamRef.current.video
			const hand = await net.estimateHands(video)
			const ctx = canvasRef.current.getContext('2d')
			drawHand(hand, ctx)
			if (hand.length > 0) {
				const gestureEstimator = new fp.GestureEstimator([...letters.allLetters])
				const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8)
				console.log('THIS IS THE GESTURE:', gesture)
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
	}, [])
	// //componentWillUpdate equivalent
	// useEffect(() => {
	// 	const loop = async () => {
	// 		const reqId = await loop()
	// 		return reqId
	// 	}
	// 	const requestId = loop()
	// 	//ComponentWillUnmount equivalent
	// 	return async () => {
	// 		window.cancelAnimationFrame(requestId)
	// 		clearTimeout(timeIntervalBetweenLetters)
	// 	}
	// }, [currentLetter])
	// ComponentWillUpdate equivalent
	// allLetterInfo.reduce transform arr to obj with key and value pairs
	// [ { letter: 'A', url: 'aa', textUrl: 'AA' }, { letter: 'B', url: 'bb', textUrl: 'BB' }]  ---> { A: [ 'aa', 'AA' ], B: [ 'bb', 'BB' ] }
	useEffect(() => {
		allLetterInfo[0] ? setCurrentLetter(allLetterInfo[0].letterwords) : ''
		setImage(
			allLetterInfo.reduce((acc, letter) => {
				acc[letter.letter] = [letter.imageUrl, letter.textUrl]
				return acc
			}, {})
		)
	}, [allLetterInfo])
	console.log('image is ---', image)
	return (
		<div className="App">
			<header className="App-header">
				<Webcam
					ref={webcamRef}
					className=" bg-yellow-300 border-4 border-gray-600"
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '8%',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 900,
						height: 600
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '8%',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 900,
						height: 600
					}}
				/>
				{image && image[currentLetter] ? (
					<div>
						<img
							src={image[currentLetter][0]}
							style={{
								position: 'relative',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: 30,
								bottom: '-20vh',
								right: 100,
								textAlign: 'center',
								height: 100
							}}
						/>
						<img
							src={image[currentLetter][1]}
							style={{
								position: 'relative',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: -100,
								bottom: '-10vh',
								right: 100,
								textAlign: 'center',
								height: 100
							}}
						/>
					</div>
				) : null}
				{translation === currentLetter ? (
					<img
						src="checkmark.gif"
						style={{
							position: 'relative',
							marginLeft: 'auto',
							marginRight: 'auto',
							left: 110,
							right: 0,
							textAlign: 'center',
							height: 100
						}}
					/>
				) : null}
			</header>
			{translation ? (
				<div
					style={{
						fontSize: 30,
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						top: '90vh',
						textAlign: 'center',
						height: '10%',
						width: '40%'
					}}>
					Detecting {translation}
				</div>
			) : null}
		</div>
	)
}
export default Learning
-------------------------------------
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
function Learning() {
	const allLetterInfo = useSelector(state => state.lettersReducer)
	console.log('all letter info', allLetterInfo)
	const letterArr = allLetterInfo.map(letter => letter.letter)
	const dispatch = useDispatch()
	const [currentLetter, setCurrentLetter] = useState(null)
	const [image, setImage] = useState(null)
	const [translation, setTranslation] = useState(null)
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const netRef = useRef(null)
	let timeIntervalBetweenLetters
	//componentDidMount equivalent
	useEffect(() => {
		dispatch(fetchAllLetters())
	}, [])
	//componentWillUpdate equivalent
	useEffect(() => {
		const loop = async () => {
			const reqId = await runHandPose()
			return reqId
		}
		const requestId = loop()
		//ComponentWillUnmount equivalent
		// return async () => {
		// 	clearInterval(await requestId)
		// 	clearTimeout(timeIntervalBetweenLetters)
		// }
	}, [currentLetter])
	// ComponentWillUpdate equivalent
	// allLetterInfo.reduce transform arr to obj with key and value pairs
	// [ { letter: 'A', url: 'aa', textUrl: 'AA' }, { letter: 'B', url: 'bb', textUrl: 'BB' }]  ---> { A: [ 'aa', 'AA' ], B: [ 'bb', 'BB' ] }
	useEffect(() => {
		// allLetterInfo[0] ? setCurrentLetter(allLetterInfo[0].letterwords) : ''
		allLetterInfo[0] ? setCurrentLetter('O') : ''
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
				console.log('THIS IS THE GESTURE:', gesture)
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
	console.log('image is ---', image)
	console.log('current letter is----', currentLetter)
	image && image[currentLetter]
		? console.log('new image is', image[currentLetter][0])
		: console.log('nothing')
	return (
		<div className="App">
			<header className="App-header">
				<Webcam
					ref={webcamRef}
					className=" bg-yellow-300 border-4 border-gray-600"
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '8%',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 900,
						height: 600
					}}
				/>
				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: '8%',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 900,
						height: 600
					}}
				/>
				{image && image[currentLetter] ? (
					<div>
						<img
							src={image[currentLetter][0]}
							style={{
								position: 'relative',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: 30,
								bottom: '-20vh',
								right: 100,
								textAlign: 'center',
								height: 100
							}}
						/>
						<img
							src={image[currentLetter][1]}
							style={{
								position: 'relative',
								marginLeft: 'auto',
								marginRight: 'auto',
								left: -100,
								bottom: '-10vh',
								right: 100,
								textAlign: 'center',
								height: 100
							}}
						/>
					</div>
				) : null}
				{translation === currentLetter ? (
					<img
						src="checkmark.gif"
						style={{
							position: 'relative',
							marginLeft: 'auto',
							marginRight: 'auto',
							left: 110,
							right: 0,
							textAlign: 'center',
							height: 100
						}}
					/>
				) : null}
			</header>
			{translation ? (
				<div
					style={{
						fontSize: 30,
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						top: '90vh',
						textAlign: 'center',
						height: '10%',
						width: '40%'
					}}>
					Detecting {translation}
				</div>
			) : null}
		</div>
	)
}
export default Learning
*/
