import axios from 'axios'
import history from '../history'

/* Action types. */
const MANUAL_SIGNIN = 'MANUAL_SIGNIN'
const MANUAL_SIGNIN_ERROR = 'MANUAL_SIGNIN_ERROR'
const CLEAR_ALERT = 'CLEAR_ALERT'
const SIGN_UP = 'SIGN_UP'
const SIGN_UP_ERROR = 'SIGN_UP_ERROR'

/* Action creators. */
const _manualSignin = token => ({ type: MANUAL_SIGNIN, token })
const _manualSigninError = alert => ({ type: MANUAL_SIGNIN_ERROR, alert })
export const _clearAlert = () => ({ type: CLEAR_ALERT })
const _signUp = token => ({ type: SIGN_UP, token })
const _signUpError = alert => ({ type: SIGN_UP_ERROR, alert })

/* Thunk creators. */
export const manualSignin = userData => {
	return async dispatch => {
		try {
			const {
				data: { token, alert }
			} = await axios.post('/auth/manualsignin', userData)

			/*
				If a token was a response from request, set it to store.
				Else a token was not sent, an alert was sent back.
				Set that alert to store.
			*/
			let action

			if (token) {
				action = _manualSignin(token)
				localStorage.setItem('token', token)
				history.push('/main') /* Redirects to main content. */
			} else {
				action = _manualSigninError(alert)
				localStorage.clear('token')
			}

			dispatch(action)
		} catch (err) {
			console.error(err)
		}
	}
}

export const signup = userData => {
	return async dispatch => {
		try {
			const {
				data: { token, alert }
			} = await axios.post('/auth/signup', userData)

			/*
				If a token was a response from request, set it to store.
				Else a token was not sent, an alert was sent back.
				Set that alert to store.
			*/

			let action

			if (token) {
				action = _signUp(token)
				localStorage.setItem('token', token)
				history.push('/main') /* Redirects to main page. */
			} else {
				localStorage.clear('token')
				action = _signUpError(alert)
			}

			dispatch(action)
		} catch (err) {
			console.error(err)
		}
	}
}

/*
    Initial state.
    'alert' will store a message to be displayed if somthing went wrong with signin or signup.
*/
const init = { alert: '', token: '', correctUser: false }

const authReducer = (state = init, action) => {
	switch (action.type) {
		case MANUAL_SIGNIN:
			/* If manual signin worked. Reset/remove alert message by setting it to an empty string. */
			return { ...state, alert: '', token: action.token, correctUser: true }
		case MANUAL_SIGNIN_ERROR:
			return { ...state, token: '', alert: action.alert, correctUser: false }
		case CLEAR_ALERT:
			return { ...state, alert: '' }
		case SIGN_UP:
			return { ...state, alert: '', token: action.token, correctUser: true }
		case SIGN_UP_ERROR:
			return { ...state, token: '', alert: action.alert, correctUser: false }
		default:
			return state
	}
}

export default authReducer
