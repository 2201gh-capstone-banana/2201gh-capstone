import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import Webcam from "react-webcam";
import { drawHand } from "../utilities/hand";
import { drawFace } from "../utilities/face";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import * as blazeface from "@tensorflow-models/blazeface";
import { paperGesture } from "./phrases/hello-thankyou";
import { loveYouGesture } from "./phrases/iloveyou";
/**
 * COMPONENT
 */
const decideGesture = (gestureName, hand, face) => {
  const tipOfIndex = hand[0].landmarks[8];
  const rightEye = face[0].landmarks[0];
  const mouth = face[0].landmarks[3];
  if (gestureName === "hello-thankyou") {
    if (Math.abs(tipOfIndex[0] - mouth[0]) <= 50 && tipOfIndex[1] > mouth[1]) {
      return "thank you";
    } else if (tipOfIndex[1] < rightEye[1]) {
      return "hello";
    }
  } else return gestureName;
};
export const Home = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [translation, setTranslation] = useState(null);
  /*
THIS WAS AN ATTEMPT TO UPDATE
TRANSLATION TO NULL WHEN HAND IS NOT IN FRAME
  const [handDetection, setHandDetection] = useState(false);
  */

  //const URL = "https://teachablemachine.withgoogle.com/models/SdeOHBnL5/";
  const URL = "https://teachablemachine.withgoogle.com/models/SdeOHBnL5/";

  let model, webcam, labelContainer, maxPredictions;

  const checkpointURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  const loadModel = async () => {
    const model = await tmImage.load(checkpointURL, metadataURL);
    console.log("Model Loaded", model);
    const net = await handpose.load();
    const netFace = await blazeface.load();
    console.log("net", net);
    setInterval(() => {
      detect(model, net, netFace);
    }, 300);
  };

  //Loop and detect hands

  async function detect(model, net, netFace) {
    // predict can take in an image, video or canvas html element
    // let prediction; what is this?
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //  Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      //make detections for hand
      const hand = await net.estimateHands(video);
      //make detections for face
      const returnTensors = false;
      const face = await netFace.estimateFaces(video, returnTensors);
      console.log("face is", face);
      // const face = await
      console.log("hand", hand);

      //make detections for hands and finger gestures
      if (hand.length > 0 && face.length > 0) {
        /*
        THIS WAS AN ATTEMPT TO UPDATE
        TRANSLATION TO NULL WHEN HAND IS NOT IN FRAME
        setHandDetection(true);
        */
        //  console.log('HAND DETECTION -->', handDetection);
        const gestureEstimator = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          paperGesture,
          loveYouGesture,
        ]);

        // 8 is the confidence level
        const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8);
        console.log("gesture is ", gesture);
        if (gesture.gestures && gesture.gestures.length > 0) {
          const score = gesture.gestures.map((prediction) => prediction.score);

          const maxScore = score.indexOf(Math.max.apply(null, score));
          const gestureName = gesture.gestures[maxScore].name;
          console.log("gestures name is -", gesture.gestures[maxScore].name);

          const result = decideGesture(gestureName, hand, face);
          console.log("result is ---", result);
          setTranslation(result);
          // setEmoji(gesture.gestures[maxScore].name);

          // console.log("EMOJI", emoji);
        }
      } else {
        // Kaia just added the line below
        setTranslation(null);
        return;
        /*
        THIS WAS AN ATTEMPT TO UPDATE TRANSLATION
        TO NULL WHEN HAND IS NOT IN FRAME
        setHandDetection(false);
        console.log('HAND DETECTION -->', handDetection);
        */
      }
      // if (hand.length === 0) {
      //   setTranslation[null];
      //uncomment this for trained model prediction
      // let prediction = await model.predict(video);
      // console.log("PREDICTION-----", prediction);

      // //-------
      // if (prediction && prediction.length > 0) {
      //   const probability = prediction.map(
      //     (prediction) => prediction.probability
      //   );
      //   console.log(probability);
      //   const maxPro = probability.indexOf(Math.max.apply(null, probability));

      //   //// Kaia just added the line below (hand.length > 0)
      //   if (prediction[maxPro].probability > 0.9 && hand.length > 0) {
      //     setTranslation(prediction[maxPro].className);
      //   } else {
      //     setTranslation(null);
      //   }
      //   // console.log("gestures name is -", prediction[maxPro].name);

      //   // console.log("TRANSLATION---", translation);
      //   // setEmoji(gesture.gestures[maxScore].name);

      //   // console.log("EMOJI", emoji);
      // } else {
      //   return;
      // }
      //uncomment above for trained model prediction
      //-------
      // for (let i = 0; i < maxPredictions; i++) {
      //   const classPrediction =
      //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      //   // labelContainer.childNodes[i].innerHTML = classPrediction;
      // }
      //draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
      drawFace(face, ctx);
    }
  }
  useEffect(() => {
    loadModel();
  }, []);
  /*
  THIS WAS AN ATTEMPT TO UPDATE TRANSLATION
  TO NULL WHEN HAND IS NOT IN FRAME
    useEffect(() => {
      if (handDetection === false) {
        setTranslation(null)
      }
    }, [handDetection]);
    */

  //only happens when you load the model
  //state/
  //use effect will update everytime that state changes
  // const { username } = props;

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          // marginTop: -240,
          marginRight: "auto",
          marginLeft: "auto",
          position: "absolute",
          zIndex: 9,
          width: 540,
          height: 480,
          backgroundColor: "black",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          // marginTop: -240,
          textAlign: "center",
          zIndex: 9,
          width: 540,
          height: 480,
          // background: "red",
        }}
      />
      <div
        style={{
          backgroundColor: "red",
          color: "black",
          fontSize: 30,

          marginLeft: 600,
        }}
      >
        {translation}
      </div>
    </div>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
