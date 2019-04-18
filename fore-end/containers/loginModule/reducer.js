import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  userInfo: {},
  isLoading: false,
}

export default handleActions({
  [`${CONSTANTS.GET_USER_INFO}_REJECTED`](state){
    return { ...state, isLoading: false }
  },
  [`${CONSTANTS.GET_USER_INFO}_FULFILLED`](state, action){
    return { ...state, userInfo: action.payload, isLoading: false }
  },
  [`${CONSTANTS.SIGN_OUT}`](state){
    return { ...state, userInfo: {} }
  },
  [CONSTANTS.SET_LOADING](state){
    return { ...state, isLoading: true }
  }
}, initState)