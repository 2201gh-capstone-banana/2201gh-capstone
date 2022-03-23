import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterB = new GestureDescription('B')
export default letterB

//Thumb
letterB.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterB.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);
letterB.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Index
letterB.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterB.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
letterB.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterB.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterB.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
letterB.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);


//Pinky
letterB.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
letterB.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);