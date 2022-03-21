export const drawFace = (predictions, ctx) => {
  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      // const start = predictions[i].topLeft;
      // const end = predictions[i].bottomRight;
      // const size = [end[0] - start[0], end[1] - start[1]];
      const landmarks = predictions[i].landmarks;

      for (let i = 0; i < landmarks.length; i++) {
        //get x
        const x = landmarks[i][0];
        //get y
        const y = landmarks[i][1];
        //start drawing
        //ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);

        // origin

        ctx.fillStyle = "orange";
        ctx.fill();
      }

      // Render a rectangle over each detected face.
      // ctx.fillRect(start[0], start[1], size[0], size[1]);
    }
  }
};
