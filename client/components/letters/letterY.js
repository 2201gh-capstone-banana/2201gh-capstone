import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const letterY = new GestureDescription('Y')

//Thumb
letterY.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
letterY.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7)

//Index
letterY.addCurl(Finger.Index, FingerCurl.FullCurl, 1)
letterY.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7)

//Middle
letterY.addCurl(Finger.Middle, FingerCurl.FullCurl, 1)
letterY.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7)

//Ring
letterY.addCurl(Finger.Ring, FingerCurl.FullCurl, 1)
letterY.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7)

//Pinky
letterY.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1)
letterY.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.7)

/*
letterY.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letterY.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
letterY.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [fp.Finger.Ring, fp.Finger.Middle, fp.Finger.Index]) {
  letterY.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterY.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterY.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterY.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterY.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
}

letterY.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
letterY.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpRight, 1.0);
letterY.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 1.0);
*/
export default letterY
