import { combineReducers } from '@reduxjs/toolkit';
import musicReducer from '../features/music/musicSlice';

const rootReducer = combineReducers({
  music: musicReducer,
  // Add more reducers here
});

export default rootReducer;
