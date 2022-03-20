// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
const pleaseGesture = new GestureDescription("pleaseGesture");

// Thumb
pleaseGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
pleaseGesture.addDirection(Finger.Thumb, FingerDirection.DiagnalUpRight, 1.0);
pleaseGesture.addDirection(Finger.Thumb, FingerDirection.DiagnalUpLeft, 1.0);

//All other fingers
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pleaseGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  pleaseGesture.addDirection(finger, FingerDirection.DiagnalUpRight, 0.9);
  pleaseGesture.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  pleaseGesture.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}

export { pleaseGesture };
