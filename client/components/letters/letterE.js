import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterE = new GestureDescription('E')
export default letterE

//thumb
letterE.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1)
letterE.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
letterE.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)

//index
letterE.addCurl(Finger.Index, FingerCurl.FullCurl, 1)
letterE.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9)
letterE.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1)
letterE.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1)

//middle
letterE.addCurl(Finger.Middle, FingerCurl.FullCurl, 1)
letterE.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)
letterE.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9)
letterE.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9)

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterE.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterE.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterE.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterE.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
	letterE.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
}
