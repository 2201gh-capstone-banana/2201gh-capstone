import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterT = new GestureDescription('T')

letterT.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterT.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9)
letterT.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
letterT.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
letterT.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9)
letterT.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9)

letterT.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0)
letterT.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0)
letterT.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)
letterT.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)
letterT.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9)

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterT.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterT.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterT.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
	letterT.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
}

export default letterT
