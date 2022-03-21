// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
const youGesture = new GestureDescription("you");

// Thumb
youGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

youGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
youGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// Index
youGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
youGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
youGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  youGesture.addCurl(finger, FingerCurl.FullCurl, 0.8);
  youGesture.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  // youGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export { youGesture };
