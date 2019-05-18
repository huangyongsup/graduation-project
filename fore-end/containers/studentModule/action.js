import { createAction } from 'redux-actions'
import { keyMirror } from "../../lib/utilService";
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host =Config.baseURL

export const CONSTANTS = keyMirror({
  GET_TEST_PAPER_LIST: 'GET_TEST_PAPER_LIST',
  GET_TEST_PAPER_INFO: 'GET_TEST_PAPER_INFO',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  ANALYSIS: 'ANALYSIS',
  GRADE: 'GRADE',
  INITIALIZE: 'INITIALIZE',
  SET_LOADING: 'SET_LOADING',
}, 'STUDENT')

export const getTestPaperList = createAction(CONSTANTS.GET_TEST_PAPER_LIST, params => ApiService.get(`${host}/api/student/getTestPaper.php`, params))

export const getTestPaperInfo = createAction(CONSTANTS.GET_TEST_PAPER_INFO, params => ApiService.get(`${host}/api/student/getTestPaper.php`, params))

export const submitAnswer = createAction(CONSTANTS.SUBMIT_ANSWER, params => ApiService.post(`${host}/api/student/submitAnswer.php`, params))

export const analysis = createAction(CONSTANTS.ANALYSIS, params => ApiService.get(`${host}/api/student/getTestPaper.php`, params))

export const grade = createAction(CONSTANTS.GRADE, params => ApiService.post(`${host}/api/teacher/grade.php`, params))

export const initialize = createAction(CONSTANTS.INITIALIZE)

export const setLoading = createAction(CONSTANTS.SET_LOADING)
