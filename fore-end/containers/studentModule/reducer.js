import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  testPaperList: [],
  testPaperInfo: {},
  analysisInfo: {},
  submitAnswerDone: false,
  gradeDone: false,
  isLoading: false,
}

export default handleActions({
  [`${CONSTANTS.GET_TEST_PAPER_LIST}_FULFILLED`](state, action){
    return { ...state, testPaperList: action.payload, isLoading: false }
  },
  [`${CONSTANTS.GET_TEST_PAPER_INFO}_FULFILLED`](state, action){
    return { ...state, testPaperInfo: action.payload, isLoading: false }
  },
  [`${CONSTANTS.SUBMIT_ANSWER}_FULFILLED`](state, action){
    return { ...state, submitAnswerDone: action.payload.submitAnswerDone, isLoading: false }
  },
  [`${CONSTANTS.ANALYSIS}_FULFILLED`](state, action){
    return { ...state, analysisInfo: action.payload, isLoading: false }
  },
  [`${CONSTANTS.GRADE}_FULFILLED`](state, action){
    return { ...state, gradeDone: action.payload.gradeDone, isLoading: false }
  },
  [`${CONSTANTS.INITIALIZE}`](state){
    return { ...state, submitAnswerDone: false }
  },
  [`${CONSTANTS.SET_LOADING}`](state){
    return { ...state, isLoading: true }
  },
}, initState)
