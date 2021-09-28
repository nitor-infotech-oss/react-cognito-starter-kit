/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLogin } from 'containers/App/selectors';

import StockPage from 'components/Home';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import SignUpPage from '../SignUpPage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import Dashboard from '../Dashboard/Loadable';
import ForgotPassword from '../ForgotPassword/Loadable';
import ResetPassword from '../ResetPassword/Loadable';

import GlobalStyle from '../../global-styles';

function App({ auth, history }) {
  // const { auth, history } = props;

  const [isAuthenticated, setAuthenticated] = useState(
    auth.data && auth.data !== false,
  );

  useEffect(() => {
    setAuthenticated(auth.data && auth.data !== false && !auth.error);
  }, [auth]);

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        {/* <Route exact component={LoginPage} /> */}
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <AuthenticatedRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/dashboard"
          component={() => (
            <StockPage component={Dashboard} history={history} />
          )}
        />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

const { object } = PropTypes;
App.propTypes = {
  auth: object,
  history: object,
  // fullScreen: bool,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
