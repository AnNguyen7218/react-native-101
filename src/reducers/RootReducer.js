import { combineReducers } from 'redux';
import error from './ErrorReducer';
import user from './UserReducer';
import status from './StatusReducer';
import movies from './MovieReducer'

const rootReducer = combineReducers({
  error,
  user,
  status,
  movies
});

export default rootReducer;
