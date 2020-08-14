import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './WeatherApp.scss';
import store from './redux/store';
import NotificationContainer from './components/notifications/NotificationContainer';
import Dashboard from './components/dashboard/Dashboard';

function WeatherApp() {
  return (
    <div className="weather-app">
      <Provider store={store}>
        <ToastProvider>
          <NotificationContainer>
            <Router>
              <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Router>
          </NotificationContainer>
        </ToastProvider>
      </Provider>
    </div>
  );
}

export default WeatherApp;
