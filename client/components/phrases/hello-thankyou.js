import { GestureDescription, Finger, FingerCurl } from "fingerpose";

const paperGesture = new GestureDescription("hello-thankyou");

//Define customized paper gesture

//paper: all fingers with no curl
for (let finger of Finger.all) {
  paperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

export { paperGesture };
