import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

export const history = createHistory()
const sagaMiddleware = createSagaMiddleware()

const store =  createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    sagaMiddleware
  ))
)
sagaMiddleware.run(rootSaga);

export default store;
