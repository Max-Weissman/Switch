import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  Reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;