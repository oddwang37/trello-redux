import { combineReducers } from 'redux';
import userReducer from './user/slices';
import columnsReducer from './columns/slices';
import cardsReducer from './cards/slices';
import commentsReducer from './comments/slices';
import popupCardReducer from './popupCard/slices';

const rootReducer = combineReducers({
  user: userReducer,
  cards: cardsReducer,
  columns: columnsReducer,
  comments: commentsReducer,
  popupCard: popupCardReducer,
});

export default rootReducer;
