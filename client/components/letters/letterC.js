import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterC = new GestureDescription('C')
export default letterC

letterC.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterC.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)

//Index
letterC.addCurl(Finger.Index, FingerCurl.NoCurl, 1)
letterC.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)

//Middle
letterC.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1)
letterC.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.7)

//Ring
letterC.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1)
letterC.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.7)

//Pinky
letterC.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1)
letterC.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.7)
