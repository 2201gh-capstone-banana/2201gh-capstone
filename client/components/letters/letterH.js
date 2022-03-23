import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const letterH = new GestureDescription('H');

//Thumb
letterH.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
letterH.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.70);

//Index
letterH.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterH.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.70);

//Middle
letterH.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterH.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.70);

//Ring
letterH.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterH.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.70);

//Pinky
letterH.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterH.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.70);