import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterI = new GestureDescription('I')
export default letterI

letterI.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterI.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
letterI.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

letterI.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
letterI.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
letterI.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
letterI.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)

for (let finger of [Finger.Ring, Finger.Index, Finger.Middle]) {
	letterI.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterI.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterI.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterI.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterI.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}
