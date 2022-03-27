import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterS = new GestureDescription('S')

//Thumb
letterS.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
letterS.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0)

for (let finger of [Finger.Ring, Finger.Pinky, Finger.Middle, Finger.Index]) {
	letterS.addCurl(finger, FingerCurl.FullCurl, 1.0)
	letterS.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterS.addDirection(finger, FingerDirection.VerticalUp, 1.0)
	letterS.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0)
	letterS.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0)
}
// //Index
// letterS.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
// letterS.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

// //Middle
// letterS.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
// letterS.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// //Ring
// letterS.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// letterS.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

// //Pinky
// letterS.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// letterS.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

/*

letterS.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1);
letterS.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

for (let finger of [
  fp.Finger.Ring,
  fp.Finger.Pinky,
  fp.Finger.Middle,
  fp.Finger.Index,
]) {
  letterS.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterS.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterS.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterS.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterS.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
}
*/

export default letterS
