/*@flow*/
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import devTools from 'remote-redux-devtools'
import createLogger from 'redux-logger'
import stepper from './reducers/stepper'


const middleware = compose(
  applyMiddleware(createLogger()),
  devTools()
)

const reducers = combineReducers({stepper})

const store = createStore(reducers, middleware)

export default store
