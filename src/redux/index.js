import {createStore, combineReducers, applyMiddleware} from 'redux';

import Common from './common/reducer'

import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({Common}),
  applyMiddleware(thunk)
);

export default store;
