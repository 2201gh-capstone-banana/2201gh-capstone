import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import lettersReducer from './letters'
import wordle from './wordle'
import isValidGuess from './checkValidGuess'
import targetWord from './targetWord'
import stats from './stats'

const reducer = combineReducers({
	auth,
	lettersReducer,
	wordle,
	isValidGuess,
	targetWord,
	stats
})

const middleware = composeWithDevTools(
	//added createLogger back if needed
	// applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
	applyMiddleware(thunkMiddleware)
)

const store = createStore(reducer, middleware)

export default store
