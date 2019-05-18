import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  singleChoiceQuestionBankData: [],
  multiChoiceQuestionBankData: [],
  shortAnswerQuestionBankData: [],
  singleChoiceSelectedRowKeys: [],
  multiChoiceSelectedRowKeys: [],
  makeTestPaperDone: false,
  setQuestionDone: false,
  classInfo: [],
  testPaperList: [],
  isLoading: false,
}

export default handleActions({
  [`${CONSTANTS.GET_SINGLE_CHOICE_QUESTION_BANK}_FULFILLED`](state, action){
    return { ...state, singleChoiceQuestionBankData: action.payload, isLoading: false }
  },
  [`${CONSTANTS.GET_MULTI_CHOICE_QUESTION_BANK}_FULFILLED`](state, action){
    return { ...state, multiChoiceQuestionBankData: action.payload, isLoading: false }
  },
  [`${CONSTANTS.GET_SHORT_ANSWER}_FULFILLED`](state, action){
    return { ...state, shortAnswerQuestionBankData: action.payload, isLoading: false }
  },
  [`${CONSTANTS.GET_CLASS_INFO}_FULFILLED`](state, action){
    return { ...state, classInfo: action.payload, isLoading: false }
  },
  [`${CONSTANTS.GET_TEST_PAPER_LIST}_FULFILLED`](state, action){
    return { ...state, testPaperList: action.payload, isLoading: false }
  },
  [`${CONSTANTS.MAKE_TEST_PAPER}_FULFILLED`](state, action){
    return { ...state, makeTestPaperDone: action.payload.makeTestPaperDone }
  },
  [`${CONSTANTS.SET_QUESTION}_FULFILLED`](state, action){
    return { ...state, setQuestionDone: action.payload.setQuestionDone }
  },
  [`${CONSTANTS.SINGLE_CHOICE_SELECTED_ROW_KEYS}`](state, action){
    return { ...state, singleChoiceSelectedRowKeys: action.payload }
  },
  [`${CONSTANTS.MULTI_CHOICE_SELECTED_ROW_KEYS}`](state, action){
    return { ...state, multiChoiceSelectedRowKeys: action.payload }
  },
  [`${CONSTANTS.SET_LOADING}`](state){
    return { ...state, isLoading: true }
  },
}, initState)
