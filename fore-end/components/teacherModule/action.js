import { createAction } from 'redux-actions'
import keyMirror from '../../lib/keyMirror'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const TEACHER = keyMirror({
  GET_QUESTION_BANK: 'GET_QUESTION_BANK',
  MAKE_TEST_PAPER: 'MAKE_TEST_PAPER',
}, 'TEACHER')

export const getQuestionBank = createAction(TEACHER.GET_QUESTION_BANK, () =>
  ApiService.get(`${host}/api/teacher/testPaperManage.php`)
)

export const makeTestPaper = createAction(TEACHER.MAKE_TEST_PAPER, (params) =>
  ApiService.post(`${host}/api/teacher/makeTestPaper.php`, params)
)
