// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterK = new GestureDescription('K')

// Thumb
letterK.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)

letterK.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterK.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

// Index and middle
for (let finger in [Finger.Index, Finger.Middle]) {
	letterK.addCurl(finger, FingerCurl.NoCurl, 1.0)

	letterK.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterK.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
	letterK.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

//Ring and Pinky
for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterK.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterK.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterK.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterK.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

export default letterK
