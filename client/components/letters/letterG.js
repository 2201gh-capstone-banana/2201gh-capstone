import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterG = new GestureDescription('G')
export default letterG

letterG.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterG.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9)
letterG.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0)
letterG.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0)
letterG.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9)
letterG.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9)

letterG.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
letterG.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0)
letterG.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0)

for (let finger of [Finger.Ring, Finger.Pinky, Finger.Middle]) {
	letterG.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterG.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterG.addDirection(finger, FingerDirection.HorizontalRight, 1.0)
	letterG.addDirection(finger, FingerDirection.HorizontalLeft, 1.0)
}
