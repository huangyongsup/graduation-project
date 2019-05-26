import { handleActions } from 'redux-actions'
import { CONSTANTS } from './action'

const initState = {
  userInfo: {},
  updateDone: false,
  isLoading: false,
  visible: false,
}

export default handleActions({
  [`${CONSTANTS.GET_USER_INFO}_REJECTED`](state){
    return { ...state, isLoading: false }
  },
  [`${CONSTANTS.GET_USER_INFO}_FULFILLED`](state, action){
    return { ...state, userInfo: action.payload, isLoading: false }
  },
  [`${CONSTANTS.UPDATE}_FULFILLED`](state, action){
    return { ...state, updateDone: action.payload.updateDone, isLoading: false, visible: action.payload.visible }
  },
  [`${CONSTANTS.SIGN_OUT}`](state){
    return { ...state, userInfo: {} }
  },
  [CONSTANTS.SET_LOADING](state){
    return { ...state, isLoading: true }
  },
  [CONSTANTS.SET_INVISIBLE](state){
    return { ...state, visible: false }
  },
  [CONSTANTS.SET_VISIBLE](state){
    return { ...state, visible: true }
  },
}, initState)
