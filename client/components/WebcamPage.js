import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { drawHand } from './utilities';

import { loveYouGesture } from './LoveYou';
import * as fp from 'fingerpose';
import * as tmImage from '@teachablemachine/image';

// import victory from './victory.png';
// import thumbs_up from './thumbs_up.png';

// const WebcamPage = () => {
// 	const webcamRef = useRef(null);
// 	const canvasRef = useRef(null);

// 	///////// NEW STUFF ADDED STATE HOOK
// 	const [emoji, setEmoji] = useState(null);
// 	// const images = { thumbs_up: thumbs_up, victory: victory };
// 	///////// NEW STUFF ADDED STATE HOOK

// 	const runHandpose = async () => {
// 		const net = await handpose.load();
// 		console.log('Handpose model loaded.');
// 		//  Loop and detect hands
// 		setInterval(() => {
// 			detect(net);
// 		}, 10);
// 	};

// 	const detect = async (net) => {
// 		// Check data is available
// 		if (
// 			typeof webcamRef.current !== 'undefined' &&
// 			webcamRef.current !== null &&
// 			webcamRef.current.video.readyState === 4
// 		) {
// 			// Get Video Properties
// 			const video = webcamRef.current.video;
// 			const videoWidth = webcamRef.current.video.videoWidth;
// 			const videoHeight = webcamRef.current.video.videoHeight;

// 			// Set video width
// 			webcamRef.current.video.width = videoWidth;
// 			webcamRef.current.video.height = videoHeight;

// 			// Set canvas height and width
// 			canvasRef.current.width = videoWidth;
// 			canvasRef.current.height = videoHeight;

// 			// Make Detections
// 			const hand = await net.estimateHands(video);
// 			// console.log(hand);

// 			///////// NEW STUFF ADDED GESTURE HANDLING

// 			if (hand.length > 0) {
// 				const GE = new fp.GestureEstimator([
// 					// fp.Gestures.VictoryGesture,
// 					// fp.Gestures.ThumbsUpGesture,
// 					loveYouGesture,
// 				]);
// 				const gesture = await GE.estimate(hand[0].landmarks, 4);
// 				if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
// 					console.log('this is a sign phrase',gesture.gestures);

// 					const confidence = gesture.gestures.map(
// 						(prediction) => prediction.confidence
// 					);
// 					const maxConfidence = confidence.indexOf(
// 						Math.max.apply(null, confidence)
// 					);
// 					// console.log(gesture.gestures[maxConfidence].name);
// 					// setEmoji(gesture.gestures[maxConfidence].name);
// 					// console.log(emoji);
// 				}
// 			}

// 			///////// NEW STUFF ADDED GESTURE HANDLING

// 			// Draw mesh
// 			const ctx = canvasRef.current.getContext('2d');
// 			drawHand(hand, ctx);
// 		}
// 	};

// 	useEffect(() => {
// 		runHandpose();
// 	}, []);

// 	return (
// 		<div className='App'>
// 			<header className='App-header'>
// 				<Webcam
// 					ref={webcamRef}
// 					style={{
// 						position: 'absolute',
// 						marginLeft: 'auto',
// 						marginRight: 'auto',
// 						left: 0,
// 						right: 0,
// 						textAlign: 'center',
// 						zindex: 9,
// 						width: 640,
// 						height: 480,
// 					}}
// 				/>

// 				<canvas
// 					ref={canvasRef}
// 					style={{
// 						position: 'absolute',
// 						marginLeft: 'auto',
// 						marginRight: 'auto',
// 						left: 0,
// 						right: 0,
// 						textAlign: 'center',
// 						zindex: 9,
// 						width: 640,
// 						height: 480,
// 					}}
// 				/>
// 				{/* NEW STUFF */}
// 				{emoji !== null ? (
// 					<img
// 						src={images[emoji]}
// 						style={{
// 							position: 'absolute',
// 							marginLeft: 'auto',
// 							marginRight: 'auto',
// 							left: 400,
// 							bottom: 500,
// 							right: 0,
// 							textAlign: 'center',
// 							height: 100,
// 						}}
// 					/>
// 				) : (
// 					''
// 				)}

// 				<div>Hi</div>
// 			</header>
// 		</div>
// 	);
// };

// export default WebcamPage;

const WebcamPage = () => {
	const URL = 'https://teachablemachine.withgoogle.com/models/fv-iBp_Kc/';
	let model, webcam, labelContainer, maxPredictions;
	async function init() {
		const modelURL = URL + 'model.json';
		const metadataURL = URL + 'metadata.json';
		model = await tmImage.load(modelURL, metadataURL);
		maxPredictions = model.getTotalClasses();
		console.log('hello');
		// Convenience function to setup a webcam
		const flip = true; // whether to flip the webcam
		webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
		await webcam.setup(); // request access to the webcam
		await webcam.play();
		window.requestAnimationFrame(loop);

		// append elements to the DOM
		document.getElementById('webcam-container').appendChild(webcam.canvas);
		labelContainer = document.getElementById('label-container');
		for (let i = 0; i < maxPredictions; i++) {
			// and class labels
			labelContainer.appendChild(document.createElement('div'));
		}
	}
	async function loop() {
		webcam.update(); // update the webcam frame
		await predict();
		window.requestAnimationFrame(loop);
	}

	// run the webcam image through the image model
	async function predict() {
		// predict can take in an image, video or canvas html element
		const prediction = await model.predict(webcam.canvas);
		for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
				prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
			labelContainer.childNodes[i].innerHTML = classPrediction;
		}
	}
	return (
		<div>
			<div>Teachable Machine Image Model</div>
			<button type='button' onClick={init}>
				Start
			</button>
			<div id='webcam-container'></div>
			<div id='label-container'></div>
		</div>
	);
};

export default WebcamPage;
