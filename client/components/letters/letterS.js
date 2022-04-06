import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterS = new GestureDescription('S')

//Thumb
letterS.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterS.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

for (let finger of [Finger.Ring, Finger.Pinky, Finger.Middle, Finger.Index]) {
	letterS.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterS.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterS.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterS.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterS.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}

export default letterS
