// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
const loveYouGesture = new GestureDescription("I love you");

// Thumb
loveYouGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
loveYouGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
loveYouGesture.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  0.25
);

// Index
loveYouGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
loveYouGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// Pinky
loveYouGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
loveYouGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

for (let finger of [Finger.Middle, Finger.Ring]) {
  loveYouGesture.addCurl(finger, FingerCurl.FullCurl, 0.8);
  loveYouGesture.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  // loveYouGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export { loveYouGesture };
