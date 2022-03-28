import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import lettersReducer from './letters'
import wordle from './wordle'
import isValidGuess from './checkValidGuess'

const reducer = combineReducers({ auth, lettersReducer, wordle, isValidGuess })

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store
