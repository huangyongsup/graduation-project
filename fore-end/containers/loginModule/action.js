import { createAction } from 'redux-actions'
import { keyMirror } from '../../lib/utilService'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const CONSTANTS = keyMirror({
  GET_USER_INFO: 'GET_USER_INFO',
  USER_REGISTER: 'USER_REGISTER',
  UPDATE: 'UPDATE',
  SIGN_OUT: 'SIGN_OUT',
  SET_LOADING: 'SET_LOADING',
  SET_INVISIBLE: 'SET_INVISIBLE',
  SET_VISIBLE: 'SET_VISIBLE',
}, 'USER')

export const getUserInfo = createAction(CONSTANTS.GET_USER_INFO,(params) => ApiService.get(`${host}/api/login/loginProcess.php`, params))

export const update = createAction(CONSTANTS.UPDATE, params => ApiService.post(`${host}/api/login/update.php`, params))

export const signOut = createAction(CONSTANTS.SIGN_OUT)

export const setLoading = createAction(CONSTANTS.SET_LOADING)

export const setInvisible = createAction(CONSTANTS.SET_INVISIBLE)

export const setVisible = createAction(CONSTANTS.SET_VISIBLE)
