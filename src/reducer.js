import { combineReducers } from '@reduxjs/toolkit';

import cities from './components/city/reducer';

const rootReducer = combineReducers({
  cities,
});

export default rootReducer;
