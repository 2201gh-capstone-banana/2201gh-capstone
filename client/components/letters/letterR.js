import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterR = new GestureDescription('R')

//Thumb
letterR.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterR.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
letterR.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)

//Index
letterR.addCurl(Finger.Index, FingerCurl.NoCurl, 1)
letterR.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)

//Middle
letterR.addCurl(Finger.Middle, FingerCurl.NoCurl, 1)
letterR.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)
letterR.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0)
letterR.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0)

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterR.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterR.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterR.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

/*
letterR.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letterR.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

letterR.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
letterR.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

letterR.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
letterR.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);
letterR.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
letterR.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
letterR.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [Finger.Ring, Finger.Pinky]) {
  letterR.addCurl(finger, FingerCurl.FullCurl, 1.0);
  letterR.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  letterR.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

*/

export default letterR
