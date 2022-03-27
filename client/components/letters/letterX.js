import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterX = new GestureDescription('X')

// //Thumb
// letterX.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
// letterX.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

// //Index
// letterX.addCurl(Finger.Index, FingerCurl.HalfCurl, 1);
// letterX.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

// //Middle
// letterX.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
// letterX.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// //Ring
// letterX.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// letterX.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

// //Pinky
// letterX.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// letterX.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);

letterX.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterX.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)
letterX.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterX.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

for (let finger of [Finger.Index]) {
	letterX.addCurl(finger, FingerCurl.HalfCurl, 1.0)
	letterX.addCurl(finger, FingerCurl.NoCurl, 0.9)
	letterX.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
	letterX.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterX.addDirection(finger, FingerDirection.VerticalUp, 0.9)
}

for (let finger of [Finger.Ring, Finger.Pinky, Finger.Middle]) {
	letterX.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterX.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterX.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterX.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
	letterX.addDirection(finger, FingerDirection.VerticalUp, 0.9)
}

export default letterX
