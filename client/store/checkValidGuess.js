import axios from 'axios'

const CHECK_VALID_GUESS = 'CHECK_VALID_GUESS'

const _checkValidGuess = bool => {
	return {
		type: CHECK_VALID_GUESS,
		bool
	}
}

export const checkValidGuess = possibleGuess => {
	return async dispatch => {
		try {
			const {data} = await axios.post(
				'/api/wordle/acceptedWord',
				{content: possibleGuess}
			)
			dispatch(_checkValidGuess(data))
		} catch (error) {
			console.log(error)
		}
	}
}

const initialState = null

export default (state = initialState, action) => {
	switch (action.type) {
		case CHECK_VALID_GUESS:
			return action.bool
		default:
			return state
	}
}
