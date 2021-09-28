/**
 *
 * ForgotPasswordPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Grid, Typography, Box } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';

import Form from 'components/Form';
import HelperText from '@material-ui/core/FormHelperText';
import * as yup from 'yup';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useSnackbar } from 'notistack';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { USER_POOL_ID, USER_POOL_WEB_CLIENT_ID } from 'utils/config';

import { push } from 'connected-react-router';

import { useStyles } from './styles';

function ForgotPasswordPage({ dispatch, email, resetEmail }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const poolData = {
    UserPoolId: USER_POOL_ID, // Your user pool id here
    ClientId: USER_POOL_WEB_CLIENT_ID, // Your client id here
  };

  const userPool = new CognitoUserPool(poolData);

  const RPValidationSchema = yup.object().shape({
    code: yup
      .string()
      .required('Please Enter verification code')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    confirmPassword: yup
      .string()
      .test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.password === value;
      }),
  });

  const user = new CognitoUser({ Username: email, Pool: userPool });

  const onSubmit = ({ code, password }) => {
    user.confirmPassword(code, password, {
      onSuccess() {
        // console.log('Password confirmed!');
        enqueueSnackbar('Password changed Successfully!', {
          variant: 'success',
        });
        resetEmail(false);
        dispatch(push('/login'));
      },
      onFailure(err) {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
        // console.log('Password not confirmed!', err);
      },
    });
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={12} square>
        <div className={classes.paper}>
          {/* <Grid container spacing={6}> */}
          <Grid container spacing={4} direction="column">
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                SET PASSWORD
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="subtitle1"
                className={classes.subtitle}
              >
                We will help you to set password and get back on track.
              </Typography>
            </Grid>
          </Grid>
          <Form
            validationSchema={RPValidationSchema}
            onSubmit={values => onSubmit(values)}
            initialValues={{ code: '', password: '', confirmPassword: '' }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <TextField
                        className={classes.textfd}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="code"
                        label="Enter Verification Code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                        value={values.code || ''}
                        onChange={event =>
                          setFieldValue('code', event.target.value)
                        }
                        error={errors.code && touched.code}
                      />

                      <HelperText
                        error={errors.code && touched.code && errors.code}
                        color="textColor"
                      >
                        {errors.code}
                      </HelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <TextField
                        className={classes.textfd}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Enter New Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={values.password.trim() || ''}
                        onChange={event =>
                          setFieldValue('password', event.target.value)
                        }
                        error={errors.password && touched.password}
                      />
                      <HelperText
                        error={
                          errors.password && touched.password && errors.password
                        }
                        color="textColor"
                      >
                        {errors.password}
                      </HelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <TextField
                        className={classes.textfd}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        value={values.confirmPassword.trim() || ''}
                        onChange={event =>
                          setFieldValue('confirmPassword', event.target.value)
                        }
                        error={
                          errors.confirmPassword && touched.confirmPassword
                        }
                      />
                      <HelperText
                        error={
                          errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword
                        }
                        color="textColor"
                      >
                        {errors.confirmPassword}
                      </HelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        //   disabled={auth.loading}
                        endIcon={<ArrowForwardIcon />}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          </Form>
          {/* </Grid> */}
        </div>
      </Grid>
    </Grid>
  );
}

const { func, oneOfType, object, string } = PropTypes;
ForgotPasswordPage.propTypes = {
  dispatch: func,
  email: oneOfType([func, object, string]),
  resetEmail: oneOfType([func, object, string]),
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ForgotPasswordPage);
