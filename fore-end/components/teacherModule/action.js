import { createAction } from 'redux-actions'
import { keyMirror } from '../../lib/utilService'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const CONSTANTS= keyMirror({
  GET_QUESTION_BANK: 'GET_QUESTION_BANK',
  MAKE_TEST_PAPER: 'MAKE_TEST_PAPER',
}, 'TEACHER')

export const getQuestionBank = createAction(CONSTANTS.GET_QUESTION_BANK, () =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`)
)

export const makeTestPaper = createAction(CONSTANTS.MAKE_TEST_PAPER, (params) =>
  ApiService.post(`${host}/api/teacher/makeTestPaper.php`, params)
)
