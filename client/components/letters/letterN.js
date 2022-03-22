// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterN = new GestureDescription('N')

// Thumb
letterN.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0)

letterN.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterN.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterN.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.8)
letterN.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.8)

// Index and middle
for (let finger in [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterN.addCurl(finger, FingerCurl.HalfCurl, 0.8)
	letterN.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterN.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterN.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterN.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
	letterN.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
}

export default letterN
