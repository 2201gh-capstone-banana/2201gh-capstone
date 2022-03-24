import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterF = new GestureDescription('F')
export default letterF

//thumb
letterF.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterF.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9)
letterF.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)
letterF.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9)
letterF.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9)

//index
letterF.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0)
letterF.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.9)
letterF.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0)
letterF.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9)
letterF.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9)

for (let finger of [Finger.Ring, Finger.Pinky, Finger.Middle]) {
	letterF.addCurl(finger, FingerCurl.NoCurl, 1.0)
	letterF.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterF.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
	letterF.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
}
