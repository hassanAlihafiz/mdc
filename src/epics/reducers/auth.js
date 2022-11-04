import { createReducer } from 'redux-create-reducer'

const initialState = {
  user: undefined,
  sudoName: undefined,
  needReload: false,
}

export default createReducer(initialState, {
  [`auth.SET_USER`](state, action) {
    return {
      ...state,
      user: action.payload.user,
      sudoName: action.payload.sudoName
    }
  },
  [`auth.CLEAR`](state, action) {
    return {
      ...state,
      user: undefined,
      sudoName: undefined
    }
  },
  [`auth.RELOAD`](state, action) {
    return {
      ...state,
      needReload: true
    }
  },
  [`auth.RELOAD_DONE`](state, action) {
    return {
      ...state,
      needReload: false
    }
  }
})
