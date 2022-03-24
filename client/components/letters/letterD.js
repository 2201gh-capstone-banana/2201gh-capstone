import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterD = new GestureDescription('D')
export default letterD

//thumb
letterD.addCurl(Finger.Thumb, FingerCurl.HalfCurl)
letterD.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

//index
letterD.addCurl(Finger.Index, FingerCurl.NoCurl)
letterD.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
letterD.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)
letterD.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0)

//middle
letterD.addCurl(Finger.Middle, FingerCurl.FullCurl)
letterD.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0)
letterD.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9)
letterD.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.9)

for (let finger of [Finger.Ring, Finger.Pinky]) {
	letterD.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterD.addCurl(finger, FingerCurl.HalfCurl, 0.9)
	letterD.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterD.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterD.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}
