import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterC = new GestureDescription('C')
export default letterC

//Thumb
letterC.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letterC.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Index
letterC.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterC.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Middle
letterC.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1);
letterC.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.70);

//Ring
letterC.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1);
letterC.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.70);

//Pinky
letterC.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1);
letterC.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.70);