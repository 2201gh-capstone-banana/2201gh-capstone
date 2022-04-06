import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterW = new GestureDescription('W')

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
