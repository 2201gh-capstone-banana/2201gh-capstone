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
		acceptedGuesses
	}
}

export const fetchAcceptedGuesses = userId => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			console.log('token is---', token)
			const { data } = await axios.get(`/api/wordle/${userId}/game`, {
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

export const addAcceptedGuess = (userId, wordleGameId, guess) => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			const { data } = await axios.post(
				`/api/wordle/${userId}/${wordleGameId}`,
				{ content: guess },
				{
					headers: {
						authorization: token
					}
				}
			)
			dispatch(addAcceptedGuesses(data.content))
		} catch (error) {
			console.log(error)
		}
	}
}

const initialState = [
	{ id: 0, cells: ['', '', '', '', ''] },
	{ id: 1, cells: ['', '', '', '', ''] },
	{ id: 2, cells: ['', '', '', '', ''] },
	{ id: 3, cells: ['', '', '', '', ''] },
	{ id: 4, cells: ['', '', '', '', ''] },
	{ id: 5, cells: ['', '', '', '', ''] }
]

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ACCEPTED_GUESSES:
			const allAcceptedGuessesObj = action.acceptedGuesses.map((ele, idx) => {
				return { id: idx, cells: ele.content.toUpperCase().split('') }
			})
			return [...allAcceptedGuessesObj, { id: 5, cells: ['', '', '', '', ''] }]
		case ADD_ACCEPTED_GUESSES:
			return [...state, action.acceptedGuesses]
		default:
			return state
	}
}
