import React, { useEffect } from 'react';
import { withToastManager } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

import { lastNotificationSelector } from './reducer';

function NotificationContainer({ toastManager, children }) {
  const notifications = useSelector((state) => state.notifications);
  const lastNotification = lastNotificationSelector(notifications);

  useEffect(() => {
    if (lastNotification) {
      const { message, type } = lastNotification;
      toastManager.add(<p>{message}</p>, {
        appearance: type,
        autoDismiss: true,
        pauseOnHover: false,
      });
    }
  }, [lastNotification, toastManager]);

  return <>{children}</>;
}

export default withToastManager(NotificationContainer);
