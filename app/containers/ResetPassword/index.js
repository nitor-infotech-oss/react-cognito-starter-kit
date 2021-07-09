/**
 *
 * Test
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Paper, Grid, Typography, Box } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';

import Form from 'components/Form';
import HelperText from '@material-ui/core/FormHelperText';
import * as yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useSnackbar } from 'notistack';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { USER_POOL_ID, USER_POOL_WEB_CLIENT_ID } from 'utils/config';

import ForgotPasswordPage from 'containers/ForgotPassword';

import { push } from 'connected-react-router';

import { useStyles } from './styles';

function ResetPasswordPage({ dispatch }) {
  const classes = useStyles();
  const [resetEmail, setResetEmail] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const poolData = {
    UserPoolId: USER_POOL_ID, // Your user pool id here
    ClientId: USER_POOL_WEB_CLIENT_ID, // Your client id here
  };

  const userPool = new CognitoUserPool(poolData);

  const ForgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Please Enter your email'),
  });

  const onSubmitForgotPassword = ({ email }) => {
    // console.log('forgotEmail', email);
    const user = new CognitoUser({ Username: email, Pool: userPool });
    user.forgotPassword({
      onSuccess: () => {
        // successfully initiated reset password request
        // console.log('CodeDeliveryData from forgotPassword: ', data);
        enqueueSnackbar('Code sent successfully!', {
          variant: 'success',
        });
        setResetEmail(email);
      },
      onFailure: err => {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
        // alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        className={classes.sideGrid}
      >
        <div className={classes.paper}>
          <Grid container spacing={8}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={1}
              className={classes.header}
            >
              <Grid item>
                <Typography component="h7" variant="h7">
                  {`Don't have an account?`}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  variant="outlined"
                  type="button"
                  // color="primary"
                  onClick={() => dispatch(push('/signup'))}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  FORGOT YOUR PASSWORD?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.subtitle}
                >
                  We will help you to reset it and get back on track.
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Form
              validationSchema={ForgotPasswordSchema}
              onSubmit={values => onSubmitForgotPassword(values)}
              initialValues={{ email: '' }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
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
                          autoFocus
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          fullWidth
                          value={values.email || ''}
                          onChange={event =>
                            setFieldValue('email', event.target.value)
                          }
                          error={errors.email && touched.email}
                        />
                        <HelperText
                          error={errors.email && touched.email && errors.email}
                          color="textColor"
                        >
                          {errors.email}
                        </HelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          // disabled={auth.loading}
                          endIcon={<ArrowForwardIcon />}
                        >
                          Send Verification code
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                      >
                        <Button
                          type="button"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          // disabled={auth.loading}
                          startIcon={<ArrowBackIcon />}
                          onClick={() => dispatch(push('/login'))}
                        >
                          Go back to Sign In
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Form>
          </Grid>
        </div>
      </Grid>
      {resetEmail && (
        <div>
          <Dialog
            open
            onClose={() => setResetEmail(false)}
            aria-labelledby="form-dialog-title"
          >
            {/* <DialogTitle id="form-dialog-title">Reset Password</DialogTitle> */}
            <DialogContent>
              <ForgotPasswordPage
                email={resetEmail}
                resetEmail={setResetEmail}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Grid>
  );
}

const { func } = PropTypes;
ResetPasswordPage.propTypes = {
  dispatch: func,
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
)(ResetPasswordPage);
