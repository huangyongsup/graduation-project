import { createAction } from 'redux-actions'
import { keyMirror } from '../../lib/utilService'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const CONSTANTS = keyMirror({
  GET_SINGLE_CHOICE_QUESTION_BANK: 'GET_SINGLE_CHOICE_QUESTION_BANK',
  GET_MULTI_CHOICE_QUESTION_BANK: 'GET_MULTI_CHOICE_QUESTION_BANK',
  GET_SHORT_ANSWER: 'GET_SHORT_ANSWER',
  SINGLE_CHOICE_SELECTED_ROW_KEYS: 'SINGLE_CHOICE_SELECTED_ROW_KEYS',
  MULTI_CHOICE_SELECTED_ROW_KEYS: 'MULTI_CHOICE_SELECTED_ROW_KEYS',
  MAKE_TEST_PAPER: 'MAKE_TEST_PAPER',
  GET_CLASS_INFO: 'GET_CLASS_INFO',
  SET_LOADING: 'SET_LOADING',
}, 'TEACHER')

export const getSingleChoiceQuestionBank = createAction(CONSTANTS.GET_SINGLE_CHOICE_QUESTION_BANK, (params) =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`, params)
)

export const getMultiChoiceQuestionBank = createAction(CONSTANTS.GET_MULTI_CHOICE_QUESTION_BANK, (params) =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`, params)
)

export const getShortAnswer = createAction(CONSTANTS.GET_SHORT_ANSWER, params => ApiService.get(`${host}/api/teacher/testPaperManage.php`, params)
)

export const getClassInfo = createAction(CONSTANTS.GET_CLASS_INFO, (params) =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`, params)
)

export const makeTestPaper = createAction(CONSTANTS.MAKE_TEST_PAPER, (params) =>
  ApiService.post(`${host}/api/teacher/makeTestPaper.php`, params)
)

export const setSingleChoiceSelectedRowKeys = createAction(CONSTANTS.SINGLE_CHOICE_SELECTED_ROW_KEYS, params => params )

export const setMultiChoiceSelectedRowKeys = createAction(CONSTANTS.MULTI_CHOICE_SELECTED_ROW_KEYS, params => params )

export const setLoading = createAction(CONSTANTS.SET_LOADING)
