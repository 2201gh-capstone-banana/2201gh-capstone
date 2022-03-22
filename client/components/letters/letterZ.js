import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterZ = new GestureDescription('Z');

//Thumb
letterZ.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.8);
letterZ.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.70);

//Index
letterZ.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterZ.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

//Middle
letterZ.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
letterZ.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.70);

//Ring
letterZ.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterZ.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.70);

//Pinky
letterZ.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterZ.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.70);

/*
letterZ.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
letterZ.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
letterZ.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

letterZ.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letterZ.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
letterZ.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
letterZ.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

for (let finger of [fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Middle]) {
  letterZ.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterZ.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterZ.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 1.0);
  letterZ.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 1.0);
  letterZ.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}
*/

export default letterZ;