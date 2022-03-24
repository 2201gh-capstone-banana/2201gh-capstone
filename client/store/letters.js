import axios from 'axios'
// ACTION TYPE
const SET_ALL_LETTERS = 'SET_ALL_LETTERS'

// ACTION CREATOR
const getAllLetters = letters => {
	return { type: SET_ALL_LETTERS, letters }
}

// THUNK
export const fetchAllLetters = () => {
	return async dispatch => {
		try {
			const { data } = await axios.get('/api/letters')
			dispatch(getAllLetters(data))
		} catch (err) {
			console.log(err)
		}
	}
}
// INITIAL STATE
const initalState = []

// REDUCER
export default function lettersReducer(state = initalState, action) {
	switch (action.type) {
		case SET_ALL_LETTERS:
			return action.letters
		default:
			return state
	}
}
