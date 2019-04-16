import { createAction } from 'redux-actions'
import { keyMirror } from '../../lib/utilService'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const CONSTANTS = keyMirror({
  GET_SINGLE_CHOICE_QUESTION_BANK: 'GET_SINGLE_CHOICE_QUESTION_BANK',
  GET_MULTI_CHOICE_QUESTION_BANK: 'GET_MULTI_CHOICE_QUESTION_BANK',
  SINGLE_CHOICE_SELECTED_ROW_KEYS: 'SINGLE_CHOICE_SELECTED_ROW_KEYS',
  MULTI_CHOICE_SELECTED_ROW_KEYS: 'MULTI_CHOICE_SELECTED_ROW_KEYS',
  MAKE_TEST_PAPER: 'MAKE_TEST_PAPER',
}, 'TEACHER')

export const getSingleChoiceQuestionBank = createAction(CONSTANTS.GET_SINGLE_CHOICE_QUESTION_BANK, (params) =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`, params)
)

export const getMultiChoiceQuestionBank = createAction(CONSTANTS.GET_MULTI_CHOICE_QUESTION_BANK, (params) =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`, params)
)

export const makeTestPaper = createAction(CONSTANTS.MAKE_TEST_PAPER, (params) =>
  ApiService.post(`${host}/api/teacher/makeTestPaper.php`, params)
)

export const setSingleChoiceSelectedRowKeys = createAction(CONSTANTS.SINGLE_CHOICE_SELECTED_ROW_KEYS, params => {
  console.log(params);
  return params

} )

export const setMultiChoiceSelectedRowKeys = createAction(CONSTANTS.MULTI_CHOICE_SELECTED_ROW_KEYS, params => params )
