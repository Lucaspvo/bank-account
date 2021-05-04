import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import sideNav from './reducers/side-nav';
import transaction from './reducers/transaction';

const rootReducer = combineReducers({
  sideNav,
  transaction,
  form: formReducer,
});

export default rootReducer;