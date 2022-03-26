// Import dependencies
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

// Define Gesture Description
const letterO = new GestureDescription('O')

letterO.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterO.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)

//Index
letterO.addCurl(Finger.Index, FingerCurl.HalfCurl, 1)
letterO.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)

//Middle
letterO.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1)
letterO.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.7)

//Ring
letterO.addCurl(Finger.Ring, FingerCurl.FullCurl, 1)
letterO.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.7)

//Pinky
letterO.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1)
letterO.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.7)

export default letterO
