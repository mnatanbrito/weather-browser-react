import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './actionTypes';

export const showNotification = (type, title, message) => (dispatch) => {
  const id = new Date().getTime();
  dispatch({
    type: SHOW_NOTIFICATION,
    id,
    type,
    title,
    message,
  });
};

export const hideNotification = (id) => (dispatch) => {
  dispatch({
    type: HIDE_NOTIFICATION,
    id,
  });
};
