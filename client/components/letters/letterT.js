import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterT = new GestureDescription('T');

//Thumb
letterT.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letterT.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Index
letterT.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
letterT.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Middle
letterT.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
letterT.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterT.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterT.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterT.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterT.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70);

/*
letterT.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
letterT.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.9);
letterT.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
letterT.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
letterT.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
letterT.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);

letterT.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
letterT.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
letterT.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
letterT.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
letterT.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.9);

for (let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  letterT.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterT.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  letterT.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);
  letterT.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.9);
}
*/

export default letterT;