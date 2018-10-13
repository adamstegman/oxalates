import { combineReducers } from 'redux'
import { foodList } from './reducers/foodList';
import { listMenu } from './reducers/listMenu';
import { session } from './reducers/session';

const oxalates = combineReducers({
  session,
  listMenu,
  foodList,
});

export default oxalates;
