import { createAction } from 'redux-actions'
import keyMirror from '../../lib/keyMirror'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const USER = keyMirror({
  GET_USER_INFO: 'GET_USER_INFO',
  USER_REGISTER: 'USER_REGISTER',
  SIGN_OUT: 'SIGN_OUT',
}, 'USER')

export const getUserInfo = createAction(USER.GET_USER_INFO,(params) =>
  ApiService.get(`${host}/api/login/loginProcess.php`, params, false)
)

export const signOut = createAction(USER.SIGN_OUT)
