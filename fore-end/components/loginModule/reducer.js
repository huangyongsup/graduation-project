import { handleActions } from 'redux-actions'
import { USER } from './action'

const initState = {
  userInfo: {},
}

export default handleActions({
  [`${USER.GET_USER_INFO}_FULFILLED`](state, action){
    return { ...state, userInfo: action.payload }
  },
  [USER.SIGN_OUT](state){
    return Object.assign({}, state, { userInfo: {} })
  }
}, initState)
