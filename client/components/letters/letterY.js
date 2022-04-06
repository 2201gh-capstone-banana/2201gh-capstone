import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterY = new GestureDescription('Y')

letterY.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterY.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterY.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

for (let finger of [Finger.Ring, Finger.Middle, Finger.Index]) {
	letterY.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterY.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterY.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterY.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterY.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}

letterY.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
letterY.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0)
letterY.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0)

export default letterY
