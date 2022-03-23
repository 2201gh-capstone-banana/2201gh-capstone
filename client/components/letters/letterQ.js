// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterQ = new GestureDescription('Q')

// Thumb
letterQ.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)

letterQ.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 1.0)
letterQ.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0)

//Index
letterQ.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0)
letterQ.addCurl(Finger.Index, FingerCurl.NoCurl, 0.8)
letterQ.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 1.0)
letterQ.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 1.0)

//Middle, Ring, and Pinky
for (let finger of [Finger.Middle, Finger.Ring, Finger.PinQy]) {
	letterQ.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterQ.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterQ.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
	letterQ.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
}

export default letterQ
