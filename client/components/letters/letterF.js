
   
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

const letterF = new GestureDescription('F')
export default letterF

//Thumb
letterF.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
letterF.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Index
letterF.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
letterF.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);

//Middle
letterF.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
letterF.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

//Ring
letterF.addCurl(Finger.Ring, FingerCurl.NoCurl, 1);
letterF.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

//Pinky
letterF.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
letterF.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);