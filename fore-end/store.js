import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from 'redux-promise-middleware'
import loginReducer from './components/loginModule/reducer'
import teacherReducer from './components/teacherModule/reducer'

const reducer = combineReducers({
  loginReducer,
  teacherReducer,
})
export default createStore(reducer, applyMiddleware(promiseMiddleware))
