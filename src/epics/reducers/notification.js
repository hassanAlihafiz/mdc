import { createReducer } from 'redux-create-reducer'

const initialState = {
  unreadNotifications: [],
}

export default createReducer(initialState, {
  [`notification.SET_UNREAD_NOTIFICATIONS`](state, action) {
    const { unreadNotifications } = action.payload
    return {
      ...state,
      unreadNotifications,
    }
  }
})
