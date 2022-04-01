import axios from 'axios'

const TOKEN = 'token'
const GET_MAX_STREAK = 'GET_MAX_STREAK'

const getMaxStreak = maxStreak => {
	return {
		type: GET_MAX_STREAK,
		maxStreak
	}
}

export const fetchMaxStreak = () => {
	console.log('get to fetchMaxStreak')
	return async dispatch => {
		try {
			console.log('GET TO TRY IN FETCH MAX STREAK')
			const token = window.localStorage.getItem(TOKEN)
			const { data } = await axios.get(`/api/wordle/max-streak`, {
				headers: {
					authorization: token
				}
			})
			console.log('DATA OR MAXSTREAK IS--', data)
			// const acceptedGuessesArr = data.acceptedGuesses || []
			dispatch(getMaxStreak(data))
		} catch (error) {
			console.log(error)
		}
	}
}
const initialState = 0

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_MAX_STREAK:
			return action.maxStreak
		default:
			return state
	}
}
