export const drawPose = (predictions, ctx) => {
  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].keypoints;
      for (let j = 5; j < 7; j++) {
        const x = keypoints[j].x;
        const y = keypoints[j].y;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();
      }
    }
  }
};
