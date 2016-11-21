/*@flow*/
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import devTools from 'remote-redux-devtools'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import routing from './reducers/routing'
import fetching from './reducers/fetching'
import survey from './reducers/survey'
import { routerReducer } from 'react-router-redux'


import { rootSaga } from './data/saga'

const reducers = combineReducers({survey, routing, fetching, router: routerReducer})

const sagaMiddleware = createSagaMiddleware()

const middleware = compose(
  applyMiddleware(createLogger(), sagaMiddleware),
  devTools()
)

const store = createStore(reducers, middleware)

export default store
sagaMiddleware.run(rootSaga)
