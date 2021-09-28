/**
 *
 * Test
 *
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import { push } from 'connected-react-router';

import { createStructuredSelector } from 'reselect';
// import { makeStyles } from '@material-ui/core/styles';

// import { loginData } from 'containers/App/actions';
import { makeSelectLogin } from 'containers/App/selectors';

// import { useSnackbar } from 'notistack';

function DashboardPage() {
  // const classes = useStyles();

  //   const { enqueueSnackbar } = useSnackbar();

  //   useEffect(() => {
  //     console.log('auth', auth);
  //   }, [auth]);

  return <h1>Welcome to Dashboard screen</h1>;
}

// const { func, oneOfType, object, string } = PropTypes;
// DashboardPage.propTypes = {
//   dispatch: func,
// auth: oneOfType([func, object, string]),
// };

const mapStateToProps = createStructuredSelector({
  auth: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // doLogin: loginData,
    // doResetRegisterData: registerDataReset,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DashboardPage);
