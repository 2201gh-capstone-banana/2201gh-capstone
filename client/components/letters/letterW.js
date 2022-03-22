import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterW = new GestureDescription('W');

//Thumb
letterW.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterW.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

//Index
letterW.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterW.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Middle
letterW.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterW.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterW.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
letterW.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.70);

//Pinky
letterW.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterW.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

/*
letterW.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
letterW.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.9);
letterW.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
letterW.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
  letterW.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  letterW.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterW.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterW.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
}

for (let finger of [fp.Finger.Pinky]) {
  letterW.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterW.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterW.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterW.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}
*/

export default letterW;