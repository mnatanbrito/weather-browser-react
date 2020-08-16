import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';

import { hideNotification } from './actions';

function NotificationContainer({ children }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications);

  useEffect(() => {
    if (notification) {
      const { id, message, notificationType } = notification;

      addToast(message, {
        appearance: notificationType,
        autoDismiss: true,
      });

      dispatch(hideNotification(id));
    }
  }, [notification, addToast, dispatch]);

  return <>{children}</>;
}

export default NotificationContainer;
