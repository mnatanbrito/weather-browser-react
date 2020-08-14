import { filter } from 'lodash/collection';
import { first } from 'lodash/array';

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes';
import { createSelector } from 'reselect';

const initialState = [];

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [...state, action.notification];

    case HIDE_NOTIFICATION:
      return filter(state, (id) => id !== action.id);

    default:
      return state;
  }
};

export default notificationsReducer;

export const lastNotificationSelector = createSelector(
  (state) => state,
  (state) => first(state)
);
