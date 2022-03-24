import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterH = new GestureDescription('H')
export default letterH

letterH.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterH.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)
letterH.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0)
letterH.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0)
letterH.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9)
letterH.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9)

letterH.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterH.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
letterH.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)

letterH.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
letterH.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0)
letterH.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0)

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterH.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterH.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterH.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
	letterH.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
}
