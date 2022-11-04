import { createReducer } from 'redux-create-reducer'

const initialState = {
  unreadMessageCount: 0,
}

export default createReducer(initialState, {
  [`message.SET_UNREAD_MESSAGES`](state, action) {
    const { unreadMessageCount } = action.payload
    return {
      ...state,
      unreadMessageCount,
    }
  }
})
