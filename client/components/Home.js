import React, { useRef } from "react";
import { connect } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import Webcam from "react-webcam";
//import { drawHand } from "./utilities";
/**
 * COMPONENT
 */

export const Home = (props) => {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  const URL = "https://teachablemachine.withgoogle.com/models/HBBfwFtF-/";

  let model, webcam, labelContainer, maxPredictions;

  const checkpointURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  const loadModel = async () => {
    const model = await tmImage.load(checkpointURL, metadataURL);
    console.log("model-----", model);
    setInterval(() => {
      detect(model);
    }, 3000);
  };

  //Loop and detect hands

  async function detect(model) {
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

      // Set canvas height and width
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;

      let prediction = await model.predict(webcamRef);
      console.log("PREDICTION-----", prediction);
      // for (let i = 0; i < maxPredictions; i++) {
      //     const classPrediction =
      //         prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
      //     // labelContainer.childNodes[i].innerHTML = classPrediction;
      // }
      //   drawHand();
    }
  }
  loadModel();
  // const { username } = props;

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          marginTop: -240,
          position: "absolute",
          zIndex: 9,
          width: 540,
          height: 480,
          backgroundColor: "black",
        }}
      />

      {/* <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginTop: -240,
          textAlign: "center",
          zIndex: 9,
          width: 540,
          height: 480,
          // background: "red",
        }}
      /> */}
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
