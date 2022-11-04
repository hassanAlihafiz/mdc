import { combineReducers } from "redux"
import apiReducer from "./api"
import commonReducer from './common'
import authReducer from './auth'
import uiReducer from './ui'
import binaryTreeReducer from './binaryTree'
import checkoutReducer from './checkout'
import shopReducer from './shop'
import notificationReducer from './notification'
import messageReducer from './message'
import publsiherReducer from './publisher'

const rootReducer = combineReducers({
  api: apiReducer,
  common: commonReducer,  
  ui: uiReducer,
  auth: authReducer,
  binaryTree: binaryTreeReducer,
  checkout: checkoutReducer,
  shop: shopReducer,
  notification: notificationReducer,
  message: messageReducer,
  publsiher: publsiherReducer,
});

export default rootReducer;
