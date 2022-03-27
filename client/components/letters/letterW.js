import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterW = new GestureDescription('W')

// //Thumb
// letterW.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
// letterW.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

// //Index
// letterW.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
// letterW.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

// //Middle
// letterW.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
// letterW.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// //Ring
// letterW.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
// letterW.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.70);

// //Pinky
// letterW.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// letterW.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

letterW.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterW.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9)
letterW.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterW.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
	letterW.addCurl(finger, FingerCurl.NoCurl, 1.0)
	letterW.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterW.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterW.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}

for (let finger of [Finger.Pinky]) {
	letterW.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterW.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterW.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterW.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

export default letterW
