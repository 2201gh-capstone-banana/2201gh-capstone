// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterL = new GestureDescription('L')

// Thumb
letterL.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterL.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0)
letterL.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0)

// Index
letterL.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterL.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
letterL.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)
letterL.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9)

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterL.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterL.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}

export default letterL
