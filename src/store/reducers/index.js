import {combineReducers} from 'redux';

import userReducer from './user';
import appReducer from './app';
import basketReducer from './basket';
import filtersReducer from './filters';

export default combineReducers({
  app: appReducer,
  user: userReducer,
  cart: basketReducer,
  filters: filtersReducer,
});
