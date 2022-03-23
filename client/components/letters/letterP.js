// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterP = new GestureDescription('P')

// Thumb
letterP.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)

letterP.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterP.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterP.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.8)
letterP.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.8)

//Index
letterP.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterP.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
letterP.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)
letterP.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)
letterP.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9)
// Middle
letterP.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterP.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.9)
letterP.addDirection(Finger.Index, FingerCurl.HorizontalLeft, 1)
letterP.addDirection(Finger.Index, FingerCurl.HorizontalRight, 1)

//Ring and Pinky
for (let finger in [Finger.Ring, Finger.Pinky]) {
	letterP.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterP.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterP.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}
export default letterP
