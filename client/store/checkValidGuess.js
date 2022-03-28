import axios from 'axios'

const CHECK_VALID_GUESS = 'CHECK_VALID_GUESS'

const _checkValidGuess = bool => {
	return {
		type: CHECK_VALID_GUESS,
		bool
	}
}

export const checkValidGuess = possibleAcceptedGuess => {
	return async dispatch => {
		try {
			const data = await axios.get(
				'/api/wordle/acceptedWord',
				possibleAcceptedGuess
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