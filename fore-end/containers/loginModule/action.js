import { createAction } from 'redux-actions'
import { keyMirror } from '../../lib/utilService'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const CONSTANTS = keyMirror({
  GET_USER_INFO: 'GET_USER_INFO',
  USER_REGISTER: 'USER_REGISTER',
  SIGN_OUT: 'SIGN_OUT',
  SET_LOADING: 'SET_LOADING',
}, 'USER')

export const getUserInfo = createAction(CONSTANTS.GET_USER_INFO,(params) =>
  ApiService.get(`${host}/api/login/loginProcess.php`, params)
)

export const signOut = createAction(CONSTANTS.SIGN_OUT)

export const setLoading = createAction(CONSTANTS.SET_LOADING)
