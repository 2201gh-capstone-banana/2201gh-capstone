// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
const niceGesture = new GestureDescription("nice");

//All fingers: no curl
for (let finger of Finger.all) {
  niceGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

//Thumb
niceGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
niceGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

export { niceGesture };
