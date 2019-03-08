import { createStore } from 'redux'
import Reducer from './reducer'
import Middleware from './middleware'

const configureStore = () => {
  const store = createStore(Reducer, Middleware);
  return store;
};

export default configureStore;