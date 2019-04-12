import { createAction } from 'redux-actions'
import keyMirror from '../../lib/keyMirror'
import Config from '../../config/config'
import ApiService from '../../lib/apiServer'

const host = Config.baseURL

export const USER = keyMirror({
  GET_USER_INFO: 'GET_USER_INFO',
  USER_REGISTER: 'USER_REGISTER',
}, 'USER')

export const getUserInfo = createAction(USER.GET_USER_INFO,(query) =>
  ApiService.get(`${host}/api/login/loginProcess.php`, query, false)
)

