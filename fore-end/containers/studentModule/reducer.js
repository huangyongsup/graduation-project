import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  testPaperList: [{}],
  testPaperInfo: {},
  analysisInfo: {},
  submitAnswerDone: false,
}

export default handleActions({
  [`${CONSTANTS.GET_TEST_PAPER_LIST}_FULFILLED`](state, action){
    return { ...state, testPaperList: action.payload }
  },
  [`${CONSTANTS.GET_TEST_PAPER_INFO}_FULFILLED`](state, action){
    return { ...state, testPaperInfo: action.payload }
  },
  [`${CONSTANTS.SUBMIT_ANSWER}_FULFILLED`](state, action){
    return { ...state, submitAnswerDone: action.payload.submitAnswerDone }
  },[`${CONSTANTS.ANALYSIS}_FULFILLED`](state, action){
    return { ...state, analysisInfo: action.payload }
  },
  [`${CONSTANTS.INITIALIZE}`](state){
    return { ...state, submitAnswerDone: false }
  },
}, initState)
