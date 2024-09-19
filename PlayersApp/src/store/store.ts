import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'
import { playersReducer } from './reducers/playersReducer';
const rootReducer = combineReducers({
  players: playersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);