import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterD = new GestureDescription('D')
export default letterD

//Thumb
letterD.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterD.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Index
letterD.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
letterD.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
letterD.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
letterD.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterD.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterD.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterD.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterD.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);