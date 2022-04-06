import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterZ = new GestureDescription('Z')

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
