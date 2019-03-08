import thunk from 'redux-thunk';
import API from '../../API';
import { applyMiddleware } from 'redux';

const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('The action: ', action)
  const returnValue = next(action)
  console.log('The new state: ', store.getState())
  console.groupEnd()
  return returnValue
}

const saver = (store) => (next) => (action) => {
  const returnValue = next(action)

  API.setExecs(store.getState())//because we only use the decks reducer

  return returnValue
}

export default applyMiddleware(thunk, saver)
