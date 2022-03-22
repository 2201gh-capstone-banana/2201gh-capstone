import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterV = new GestureDescription('V');

//Thumb
letterV.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterV.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

//Index
letterV.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterV.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Middle
letterV.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterV.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterV.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterV.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterV.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterV.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

/*
letterV.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.9);
letterV.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1);
letterV.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
letterV.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letterV.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

for (let finger of [fp.Finger.Index, fp.Finger.Middle]) {
  letterV.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  letterV.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterV.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterV.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
}

for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  letterV.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterV.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterV.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterV.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}
*/

export default letterV;