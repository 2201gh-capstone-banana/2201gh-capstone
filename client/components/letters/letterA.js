import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterA = new GestureDescription('A')

letterA.addCurl(Finger.Thumb, FingerCurl.NoCurl)
letterA.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterA.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

letterA.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.9)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterA.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterA.addDirection(finger, FingerDirection.VerticalUp, 1)
	letterA.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
	letterA.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
}

export default letterA
