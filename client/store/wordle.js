import axios from 'axios'

const TOKEN = 'token'

const SET_ACCEPTED_GUESSES = 'SET_ACCEPTED_GUESSES'
const ADD_GUESS = 'ADD_GUESS'

// const setGuesses = (words) => {
//     return {
//         type: SET_GUESSES,
//         words
//     }
// };
const getAcceptedGuesses = acceptedGuesses => {
	return {
		type: SET_ACCEPTED_GUESSES,
		acceptedGuesses
	}
}

// const addGuess = word => {
// 	return {
// 		type: ADD_GUESS,
// 		word
// 	}
// }

// export const fetchGuesses = () => {
//     return async (dispatch) => {
//         try {
//             const token = window.localStorage.getItem(TOKEN);
//             const { data } = await axios.get('/api/wordle', {
//                 headers: {
//                     authorization: token
//                 }
//             });
//             dispatch(setGuesses(data));
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };

export const fetchAcceptedGuesses = userId => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			console.log('token is---', token)
			const { data } = await axios.get(`/api/users/${userId}/latestguesses`, {
				headers: {
					authorization: token
				}
			})
			dispatch(getAcceptedGuesses(data))
		} catch (error) {
			console.log(error)
		}
	}
}

// export const addGuessThunk = word => {
// 	return async dispatch => {
// 		try {
// 			const token = window.localStorage.getItem(TOKEN)
// 			const { data: created } = await axios.post('/api/wordle', word, {
// 				headers: {
// 					authorization: token
// 				}
// 			})
// 			dispatch(addGuess(created))
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// }

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ACCEPTED_GUESSES:
			return action.acceptedGuesses
		// case ADD_GUESS:
		// 	return [...state, action.word]
		default:
			return state
	}
}
