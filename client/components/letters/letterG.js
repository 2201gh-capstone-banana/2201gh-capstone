import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterG = new GestureDescription('G')
export default letterG


//Thumb
letterG.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letterG.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Index
letterG.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterG.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.70);

//Middle
letterG.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
letterG.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.70);

//Ring
letterG.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterG.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.70);

//Pinky
letterG.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterG.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.70);