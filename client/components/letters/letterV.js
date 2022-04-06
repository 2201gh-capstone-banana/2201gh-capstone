import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterV = new GestureDescription('V')

letterV.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)
letterV.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
letterV.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterV.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterV.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

for (let finger of [Finger.Index, Finger.Middle]) {
	letterV.addCurl(finger, FingerCurl.NoCurl, 1.0)
	letterV.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterV.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterV.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterV.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterV.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterV.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterV.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

export default letterV
