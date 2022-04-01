import axios from 'axios'

const TOKEN = 'token'
const GET_USER_SCORES = 'GET_USER_SCORES'
const ADD_USER_WIN = 'ADD_USER_WIN'
const ADD_USER_LOSS = 'ADD_USER_LOSS'


const getUserScores = () => {
    return {
        type: GET_USER_SCORES
    }
}

const addUserWin = currentRow => {
    return {
        type: ADD_USER_WIN,
        currentRow
    }
}

const addUserLoss = () =>{
    type: ADD_USER_LOSS
}

export const fetchUserScores =() => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            const { data } = await axios.get(`/api/wordle/game`, {
                headers: {
                    authorization: token
                }
            })
            // const acceptedGuessesArr = data.acceptedGuesses || []
            // const targetWord = data.targetWord;
            dispatch(getUserScores(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TARGET_WORD:
            return action.targetWord.content.toUpperCase();
        default:
            return state
    }
}