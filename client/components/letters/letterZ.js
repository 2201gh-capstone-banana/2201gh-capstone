import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterZ = new GestureDescription('Z')

// //Thumb
// letterZ.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.8);
// letterZ.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.70);

// //Index
// letterZ.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
// letterZ.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

// //Middle
// letterZ.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
// letterZ.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.70);

// //Ring
// letterZ.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// letterZ.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.70);

// //Pinky
// letterZ.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// letterZ.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.70);

letterZ.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterZ.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterZ.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

letterZ.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterZ.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)
letterZ.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)
letterZ.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)

for (let finger of [Finger.Ring, Finger.Pinky, Finger.Middle]) {
	letterZ.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterZ.addCurl(finger, FingerCurl.HalfCurl, 1.0)
	letterZ.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
	letterZ.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterZ.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

export default letterZ
