import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterI = new GestureDescription('I')
export default letterI

//Thumb
letterI.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterI.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7)

//Index
letterI.addCurl(Finger.Index, FingerCurl.FullCurl, 1)
letterI.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7)

//Middle
letterI.addCurl(Finger.Middle, FingerCurl.FullCurl, 1)
letterI.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7)

//Ring
letterI.addCurl(Finger.Ring, FingerCurl.FullCurl, 1)
letterI.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7)

//Pinky
letterI.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1)
letterI.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7)
