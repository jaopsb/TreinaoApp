import { combineReducers } from 'redux'
import treinos from './treinos'
import tracker from './tracker'
import config from './config'

export default combineReducers({
  treinos,
  config,
  tracker
})