import axios from 'axios'

const TOKEN = 'token'

const GET_ACCEPTED_GUESSES = 'GET_ACCEPTED_GUESSES'
const ADD_ACCEPTED_GUESSES = 'ADD_ACCEPTED_GUESSES'

const getAcceptedGuesses = acceptedGuesses => {
	return {
		type: GET_ACCEPTED_GUESSES,
		acceptedGuesses
	}
}

const addAcceptedGuesses = acceptedGuesses => {
	return {
		type: ADD_ACCEPTED_GUESSES,
		acceptedGuesses: acceptedGuesses.content
	}
}

export const fetchAcceptedGuesses = () => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)

			const { data } = await axios.get(`/api/wordle/game`, {
				headers: {
					authorization: token
				}
			})
			const acceptedGuessesArr = data.acceptedGuesses || []
			dispatch(getAcceptedGuesses(acceptedGuessesArr))
		} catch (error) {
			console.log(error)
		}
	}
}

export const addAcceptedGuess = guess => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			const { data } = await axios.post(
				`/api/wordle/addGuess`,
				{ content: guess },
				{
					headers: {
						authorization: token
					}
				}
			)
			dispatch(addAcceptedGuesses(data))
		} catch (error) {
			console.log(error)
		}
	}
}

const initialState = { alert: '', guesses: [] }

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ACCEPTED_GUESSES:
			const allAcceptedGuesses = action.acceptedGuesses.map((ele, idx) => {
				return ele.content.toUpperCase()
			})

			return { ...state, guesses: allAcceptedGuesses }
		case ADD_ACCEPTED_GUESSES:
			return {
				...state,
				guesses: [...state.guesses, action.acceptedGuesses.toUpperCase()]
			}

		default:
			return state
	}
}
