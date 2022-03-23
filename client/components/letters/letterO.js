// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterO = new GestureDescription('O')

// Thumb
letterO.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.8)
letterO.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterO.addCurl(Finger.Thumb, FingerCurl.DiagonalUpLeft, 1.0)
letterO.addCurl(Finger.Thumb, FingerCurl.DiagpnalUpRight, 1.0)
letterO.addCurl(Finger.Thumb, FingerCurl.VerticalUp, 0.8)
letterO.addCurl(Finger.Thumb, FingerCurl.HorizontalLeft, 0.8)
letterO.addCurl(Finger.Thumb, FingerCurl.HorizontalRight, 0.8)

// Index and middle
for (let finger in [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterO.addCurl(finger, FingerCurl.HalfCurl, 1.0)
	letterO.addCurl(finger, FingerCurl.DiagonalUpLeft, 1.0)
	letterO.addCurl(finger, FingerCurl.DiagpnalUpRight, 1.0)
}

export default letterO
