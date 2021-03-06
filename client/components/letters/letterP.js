// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterP = new GestureDescription('P')

letterP.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterP.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0)
letterP.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0)

letterP.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterP.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
letterP.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)

letterP.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
letterP.addCurl(Finger.Middle, FingerCurl.HorizontalLeft, 1)
letterP.addCurl(Finger.Middle, FingerCurl.HorizontalRight, 1)
letterP.addCurl(Finger.Middle, FingerCurl.DiagonalDownLeft, 1)
letterP.addCurl(Finger.Middle, FingerCurl.DiagonalDownRight, 1)

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterP.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterP.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterP.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
	letterP.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
	letterP.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0)
	letterP.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0)
}
export default letterP
