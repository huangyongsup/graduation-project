import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  submitAnswerDone: false,
}

export default handleActions({
  [`${CONSTANTS.SUBMIT_ANSWER}_FULFILLED`](state, action){
    return { ...state, submitAnswerDone: action.payload }
  }
}, initState)
