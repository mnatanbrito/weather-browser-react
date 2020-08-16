import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes';

const initialState = null;

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.notification;

    case HIDE_NOTIFICATION:
      return null;

    default:
      return state;
  }
};

export default notificationsReducer;
