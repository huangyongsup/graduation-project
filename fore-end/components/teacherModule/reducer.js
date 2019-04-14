import { handleActions } from 'redux-actions'
import { TEACHER } from './action'

const initState = {
  questionBankData: [],
  makeTestPaperDone: false,
}

export default handleActions({
  [`${TEACHER.GET_QUESTION_BANK}_FULFILLED`](state, action){
    return { ...state, questionBankData: action.payload }
  },
  [`${TEACHER.MAKE_TEST_PAPER}_FULFILLED`](state, action){
    // return { ...state, makeTestPaperDone: action.payload }
    return Object.assign({}, state, { makeTestPaperDone: action.payload })
  }
}, initState)
