import { combineReducers } from '@reduxjs/toolkit';

import cities from '../components/city/reducer';
import settings from '../components/settings/reducer';
import notifications from '../components/notifications/reducer';

const rootReducer = combineReducers({
  cities,
  settings,
  notifications,
});

export default rootReducer;
