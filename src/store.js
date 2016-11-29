/*@flow*/
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { rootSaga } from './data/saga'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import fetching from './reducers/fetching'
import routing from './reducers/routing'
import survey from './reducers/survey'

const reducers = combineReducers({survey, routing, fetching})
const sagaMiddleware = createSagaMiddleware()
const middleware = compose(
  applyMiddleware(createLogger(), sagaMiddleware),
  devTools()
)
const store = createStore(reducers, middleware)


sagaMiddleware.run(rootSaga)
export default store
