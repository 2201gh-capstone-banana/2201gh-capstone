//Pointers for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

//drawing function
export const drawHand = (prediction, ctx) => {
  if (prediction.length > 0) {
    prediction.forEach((prediction) => {
      //extract landmarks
      const landmarks = prediction.landmarks;

      //Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        //loop through the pair of joints
        const finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          //Get pair of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJoinIndex = fingerJoints[finger][k + 1];

          // 203.90426040496055, 388.1905885750879;
          //draw path
          ctx.beginPath();

          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJoinIndex][0],
            landmarks[secondJoinIndex][1]
          );
          ctx.stroke();
          // ctx.strokeStyle = "plum";
          // ctx.lineWidth = 4;
        }
      }

      //loop through landmarks and draw them (each landmark has [x, y, z])
      for (let i = 0; i < landmarks.length; i++) {
        //get x
        const x = landmarks[i][0];
        //get y
        const y = landmarks[i][1];
        //start drawing
        //ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);

        //set line colow
        ctx.fillStyle = "indigo";
        ctx.fill();
      }
    });
  }
};
