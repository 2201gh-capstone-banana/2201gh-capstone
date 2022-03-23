import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterE = new GestureDescription('E')
export default letterE

//Thumb
letterE.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterE.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Index
letterE.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
letterE.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

//Middle
letterE.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
letterE.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterE.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
letterE.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterE.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
letterE.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);