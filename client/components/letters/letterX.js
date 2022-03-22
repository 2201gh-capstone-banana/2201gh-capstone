import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterX = new GestureDescription('X');

//Thumb
letterX.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterX.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Index
letterX.addCurl(Finger.Index, FingerCurl.HalfCurl, 1);
letterX.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
letterX.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
letterX.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterX.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterX.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterX.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterX.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);

/*
letterX.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letterX.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.9);
letterX.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
letterX.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [fp.Finger.Index]) {
  letterX.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
  letterX.addCurl(finger, fp.FingerCurl.NoCurl, 0.9);
  letterX.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
  letterX.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterX.addDirection(finger, fp.FingerDirection.VerticalUp, 0.9);
}

for (let finger of [fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Middle]) {
  letterX.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterX.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterX.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterX.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
  letterX.addDirection(finger, fp.FingerDirection.VerticalUp, 0.9);
}

*/

export default letterX;