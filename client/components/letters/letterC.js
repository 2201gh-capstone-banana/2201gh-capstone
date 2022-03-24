import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterC = new GestureDescription('C')
export default letterC

//thumb
letterC.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
letterC.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1)
letterC.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1)

//pinky
letterC.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1)
letterC.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1)
letterC.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1)
letterC.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
	letterC.addCurl(finger, FingerCurl.HalfCurl, 1)
	letterC.addDirection(finger, FingerDirection.DiagonalUpRight, 1)
	letterC.addDirection(finger, FingerDirection.DiagonalUpLeft, 1)
}
