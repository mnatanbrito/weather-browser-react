import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes';

export const showNotification = (notificationType, message) => (dispatch) => {
  const id = new Date().getTime();
  dispatch({
    type: SHOW_NOTIFICATION,
    notification: {
      id,
      notificationType,
      message,
    },
  });
};

export const hideNotification = (id) => (dispatch) => {
  dispatch({
    type: HIDE_NOTIFICATION,
    id,
  });
};
