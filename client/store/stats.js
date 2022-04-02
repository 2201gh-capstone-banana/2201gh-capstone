import axios from 'axios'

const TOKEN = 'token'
const GET_STATS = 'GET_STATS'

const getMaxStreak = statsObj => {
	return {
		type: GET_STATS,
		totalGamePlayed: statsObj.totalGamePlayed,
		percentageWin: statsObj.percentageWin,
		currentStreak: statsObj.currentStreak,
		maxStreak: statsObj.maxStreak
	}
}

export const fetchMaxStreak = () => {
	console.log('get to fetchMaxStreak')
	return async dispatch => {
		try {
			console.log('GET TO TRY IN FETCH MAX STREAK')
			const token = window.localStorage.getItem(TOKEN)
			const { data } = await axios.get('/api/wordle/stats', {
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
const initialState = {
	totalGamePlayed: 0,
	percentageWin: 0,
	currentStreak: 0,
	maxStreak: 0
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STATS:
			return {
				...state,
				totalGamePlayed: action.totalGamePlayed,
				percentageWin: action.percentageWin,
				currentStreak: action.currentStreak,
				maxStreak: action.maxStreak
			}
		default:
			return state
	}
}
