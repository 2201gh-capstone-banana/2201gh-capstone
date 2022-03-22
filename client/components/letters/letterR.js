import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterR = new GestureDescription('R');

//Thumb
letterR.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterR.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

//Index
letterR.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterR.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
letterR.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterR.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterR.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterR.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterR.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterR.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);

/*
letterR.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
letterR.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

letterR.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
letterR.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

letterR.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
letterR.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 0.9);
letterR.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
letterR.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 1.0);
letterR.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  letterR.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  letterR.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  letterR.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
}

*/

export default letterR;