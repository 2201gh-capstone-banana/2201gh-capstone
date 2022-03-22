// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterM = new GestureDescription('M')

// Thumb
letterM.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0)

letterM.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterM.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterM.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.8)
letterM.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.8)

// Index and middle
for (let finger in [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterM.addCurl(finger, FingerCurl.HalfCurl, 0.8)
	letterM.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterM.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterM.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterM.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
	letterM.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
}

export default letterM
