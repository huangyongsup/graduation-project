import { createAction } from 'redux-actions'
import { keyMirror } from "../../lib/utilService";
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = ApiService.baseURL

export const CONSTANTS = keyMirror({
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
}, 'STUDENT')

export const submitAnswer = createAction(CONSTANTS.SUBMIT_ANSWER, params => ApiService.post(`${host}/api/student/submitAnswer`, params))



