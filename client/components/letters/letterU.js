import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterU = new GestureDescription('U');

//Thumb
letterU.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterU.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

//Index
letterU.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterU.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
letterU.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterU.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterU.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterU.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterU.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterU.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

/*
letterU.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.9);
letterU.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letterU.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
letterU.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
letterU.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

for (let finger of [fp.Finger.Index, fp.Finger.Middle]) {
  letterU.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  letterU.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  letterU.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterU.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterU.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}
*/

export default letterU;