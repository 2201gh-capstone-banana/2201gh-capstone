/*

0: (3) ['Thumb', 'No Curl', 'Diagonal Down Left']
1: (3) ['Index', 'Full Curl', 'Horizontal Left']
2: (3) ['Middle', 'Full Curl', 'Horizontal Left']
3: (3) ['Ring', 'Full Curl', 'Horizontal Left']
4: (3) ['Pinky', 'Full Curl', 'Diagonal Up Left']
*/

import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose'

const deleteGesture = new GestureDescription('delete')

deleteGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl)
// deleteGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)
// deleteGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0)
deleteGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 1.0)
deleteGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0)
deleteGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0)
// deleteGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0)

// deleteGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.9)

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	deleteGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
	deleteGesture.addDirection(finger, FingerDirection.HorizontalLeft, 1)
    deleteGesture.addDirection(finger, FingerDirection.HorizontalRight, 1)
	deleteGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9)
	deleteGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9)
}

export default deleteGesture