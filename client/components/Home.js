import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
/**
 * COMPONENT
 */

export const Home = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [translation, setTranslation] = useState(null);

  const URL = "https://teachablemachine.withgoogle.com/models/SdeOHBnL5/";

  let model, webcam, labelContainer, maxPredictions;

  const checkpointURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  const loadModel = async () => {
    const model = await tmImage.load(checkpointURL, metadataURL);
    console.log("Model Loaded", model);
    const net = await handpose.load();
    console.log("net", net);
    setInterval(() => {
      detect(model, net);
    }, 500);
  };

  //Loop and detect hands

  async function detect(model, net) {
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
      console.log("hand", hand);

      //make detections for hands and finger gestures
      if (hand.length > 0) {
        const gestureEstimator = new fp.GestureEstimator([
          //do we need this thumgs up gesture estimator?
          fp.Gestures.ThumbsUpGesture,
        ]);

        // 8 is the confidence level
        const gesture = await gestureEstimator.estimate(hand[0].landmarks, 8);
        if (gesture.gestures && gesture.gestures.length > 0) {
          const score = gesture.gestures.map((prediction) => prediction.score);

          const maxScore = score.indexOf(Math.max.apply(null, score));

          console.log("gestures name is -", gesture.gestures[maxScore].name);
        }
      } else {
        // Kaia just added the line below
        setTranslation(null);
        return;
      }
      let prediction = await model.predict(video);
      console.log("PREDICTION-----", prediction);

      if (prediction && prediction.length > 0) {
        const probability = prediction.map(
          (prediction) => prediction.probability
        );
        console.log(probability);
        const maxPro = probability.indexOf(Math.max.apply(null, probability));

        // Kaia just added the line below (hand.length > 0)
        if (prediction[maxPro].probability > 0.9 && hand.length > 0) {
          setTranslation(prediction[maxPro].className);
        } else {
          setTranslation(null);
        }
      } else {
        return;
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }
  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
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
          textAlign: "center",
          zIndex: 9,
          width: 540,
          height: 480,
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


const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
