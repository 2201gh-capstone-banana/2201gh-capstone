import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterB = new GestureDescription('B')
export default letterB

letterB.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1)
letterB.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	letterB.addCurl(finger, FingerCurl.NoCurl, 1.0)
	letterB.addCurl(finger, FingerDirection.VerticalUp, 1.0)
}
