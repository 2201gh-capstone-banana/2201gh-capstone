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
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			const { data } = await axios.get('/api/wordle/stats', {
				headers: {
					authorization: token
				}
			})

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
				percentageWin: action.percentageWin || 0,
				currentStreak: action.currentStreak,
				maxStreak: action.maxStreak
			}
		default:
			return state
	}
}
