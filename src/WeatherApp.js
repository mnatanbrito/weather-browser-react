import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import './WeatherApp.scss';
import store from './redux/store';
import i18Messages from './i18n/messages';
import locales from './i18n/locales';
import NotificationContainer from './components/notifications/NotificationContainer';
import Dashboard from './components/dashboard/Dashboard';

function WeatherApp() {
  return (
    <div className="weather-app">
      <Provider store={store}>
        <LanguageWrapper />
      </Provider>
    </div>
  );
}

function LanguageWrapper() {
  const settings = useSelector((state) => state.settings);
  const localizedMessages = i18Messages[settings.language];

  return (
    <IntlProvider
      messages={localizedMessages}
      locale={settings.language}
      defaultLocale={locales.EN}
    >
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
    </IntlProvider>
  );
}

export default WeatherApp;
