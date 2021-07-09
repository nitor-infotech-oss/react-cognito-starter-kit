/**
 *
 * This components serves as a routing component that automatically redirects users to the Login page if it's not authenticated; otherwise the user will be redirected to the designated component/page
 *
 */

import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthenticatedRoute({
  component: Component,
  isAuthenticated,
  appInfo,
  ...rest
}) {
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { appInfo } }} />
        )
      }
    />
  );
}

const { object, func, oneOfType, node, bool } = PropTypes;
AuthenticatedRoute.propTypes = {
  component: oneOfType([func, object, node]).isRequired,
  render: func,
  isAuthenticated: oneOfType([object, bool]),
  appInfo: object,
};
AuthenticatedRoute.defaultProps = {
  isAuthenticated: false,
  appInfo: undefined,
  render: undefined,
};

export default memo(AuthenticatedRoute);
