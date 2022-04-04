import axios from 'axios'

const TOKEN = 'token'
const GET_TARGET_WORD = 'GET_TARGET_WORD'

const getTargetWord = targetWord => {
	return {
		type: GET_TARGET_WORD,
		targetWord
	}
}

export const fetchTargetWord = () => {
	return async dispatch => {
		try {
			const token = window.localStorage.getItem(TOKEN)
			const { data } = await axios.get(`/api/wordle/game`, {
				headers: {
					authorization: token
				}
			})
			// const acceptedGuessesArr = data.acceptedGuesses || []
			const targetWord = data.targetWord
			console.log('TARGET WORD IS', targetWord)
			dispatch(getTargetWord(targetWord))
		} catch (error) {
			console.log(error)
		}
	}
}
const initialState = ''

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TARGET_WORD:
			return action.targetWord.content.toUpperCase()
		default:
			return state
	}
}
