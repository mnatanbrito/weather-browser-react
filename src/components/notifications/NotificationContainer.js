import React from 'react';
import { withToastManager } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';

function NotificationContainer({ toastManager, children }) {
  const notifications = useSelector((state) => state.notifications);

  return <>{children}</>;
}

export default withToastManager(NotificationContainer);
