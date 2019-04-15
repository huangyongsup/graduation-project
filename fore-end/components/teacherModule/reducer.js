import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  questionBankData: [],
  makeTestPaperDone: false,
}

export default handleActions({
  [`${CONSTANTS.GET_QUESTION_BANK}_FULFILLED`](state, action){
    return { ...state, questionBankData: action.payload }
  },
  [`${CONSTANTS.MAKE_TEST_PAPER}_FULFILLED`](state, action){
    // return { ...state, makeTestPaperDone: action.payload }
    return Object.assign({}, state, { makeTestPaperDone: action.payload })
  }
}, initState)
