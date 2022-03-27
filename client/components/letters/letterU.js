import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterU = new GestureDescription('U')

// //Thumb
// letterU.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
// letterU.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

// //Index
// letterU.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
// letterU.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

// //Middle
// letterU.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
// letterU.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// //Ring
// letterU.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// letterU.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

// //Pinky
// letterU.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// letterU.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

letterU.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)
letterU.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterU.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterU.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterU.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

for (let finger of [Finger.Index, Finger.Middle]) {
	letterU.addCurl(finger, FingerCurl.NoCurl, 1.0)
	letterU.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterU.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterU.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterU.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

export default letterU
