/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

// Import i18n messages

import { MuiThemeProvider } from '@material-ui/core/styles';

import { SnackbarProvider } from 'notistack';

import { persistStore } from 'redux-persist';

import { PersistGate } from 'redux-persist/integration/react'; // eslint-disable-line global-require

import theme from 'utils/theme';
import { translationMessages } from './i18n';
import configureStore from './configureStore';

const runtime = require('offline-plugin/runtime');

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

const persistor = persistStore(store);

const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                autoHideDuration={3000}
              >
                <App history={history} runtime={runtime} />
              </SnackbarProvider>
            </MuiThemeProvider>
          </ConnectedRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
