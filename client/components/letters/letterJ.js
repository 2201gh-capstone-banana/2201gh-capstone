// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterJ = new GestureDescription('J')

// Thumb
letterJ.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)
letterJ.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
letterJ.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterJ.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

// Index, Middle, Ring
for (let finger of [Finger.Ring, Finger.Index, Finger.Middle]) {
	letterJ.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterJ.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterJ.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
	letterJ.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterJ.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
	letterJ.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
	letterJ.addDirection(finger, FingerDirection.VerticalUp, 1.0)
}

//Pinky
letterJ.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
letterJ.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0)
letterJ.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0)
letterJ.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0)
letterJ.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0)

letterJ.addDirection(Finger.Pinky, FingerDirection.DiagonalDownLeft, 1.0)
letterJ.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 1.0)

export default letterJ
