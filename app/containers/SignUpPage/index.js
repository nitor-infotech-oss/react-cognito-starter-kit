/**
 *
 * Test
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Paper, Grid, Typography, Box } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import { registerData, registerDataReset } from 'containers/App/actions';
import { makeSelectRegister } from 'containers/App/selectors';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { push } from 'connected-react-router';

import Link from '@material-ui/core/Link';

import Form from 'components/Form';
import HelperText from '@material-ui/core/FormHelperText';
import * as yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useSnackbar } from 'notistack';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import Button from '@material-ui/core/Button';

import { USER_POOL_ID, USER_POOL_WEB_CLIENT_ID } from 'utils/config';

import { useStyles } from './styles';

function SignUpPage({ dispatch, doRegister, register, doResetRegisterData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(doResetRegisterData());
  }, []);

  const poolData = {
    UserPoolId: USER_POOL_ID, // Your user pool id here
    ClientId: USER_POOL_WEB_CLIENT_ID, // Your client id here
  };

  const userPool = new CognitoUserPool(poolData);

  const LoginValidationSchema = yup.object().shape({
    firstName: yup.string().required('Please Enter your First Name'),
    lastName: yup.string().required('Please Enter your Last Name'),
    department: yup.string().required('Please Enter your Department'),
    email: yup
      .string()
      .email()
      .required('Please Enter your email'),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const onSubmit = ({ firstName, lastName, department, email, password }) => {
    dispatch(doRegister({ firstName, lastName, department, email, password }));
  };

  const submitCode = () => {
    const uname = register.data
      ? register.data.username
      : register.error.username;
    const userData = {
      Username: uname,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, err => {
      if (err) {
        // console.log('error', err.message);
        return;
      }
      handleClose();
      dispatch(push('/dashboard'));
      // console.log(`call result: ${JSON.stringify(result)}`);
    });
  };

  const resendOtp = () => {
    const uname = register.data
      ? register.data.username
      : register.error.username;
    const userData = {
      Username: uname,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    // e.preventDefault();
    cognitoUser.resendConfirmationCode(err => {
      if (err) {
        // alert(err.message || JSON.stringify(err));
        return;
      }
      handleClickOpen();
      // console.log('call result: ', result);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(doResetRegisterData());
    setOpen(false);
  };

  useEffect(() => {
    if (register.data) {
      enqueueSnackbar('OTP Send', {
        variant: 'success',
      });
      handleClickOpen();
    }
    if (register.error) {
      enqueueSnackbar(register.error.message, {
        variant: 'failure',
      });
      // resendOtp();
    }
  }, [register]);

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
                  {`Already have an account?`}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  variant="outlined"
                  type="button"
                  // color="primary"
                  borderRadius={16}
                  onClick={() => {
                    dispatch(doResetRegisterData());
                    dispatch(push('/login'));
                  }}
                >
                  Sign In
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
                  GET STARTED
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.subtitle}
                >
                  Create an account to continue
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Form
              validationSchema={LoginValidationSchema}
              onSubmit={values => onSubmit(values)}
              initialValues={{
                firstName: '',
                lastName: '',
                department: '',
                email: '',
                password: '',
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <TextField
                          className={classes.textfd}
                          autofocus
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          name="firstName"
                          autoComplete="firstName"
                          value={values.firstName || ''}
                          onChange={event =>
                            setFieldValue('firstName', event.target.value)
                          }
                          error={errors.firstName && touched.firstName}
                        />

                        <HelperText
                          error={
                            errors.firstName &&
                            touched.firstName &&
                            errors.firstName
                          }
                          color="textColor"
                        >
                          {errors.firstName}
                        </HelperText>
                      </Box>
                    </Grid>
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
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lastName"
                          value={values.lastName || ''}
                          onChange={event =>
                            setFieldValue('lastName', event.target.value)
                          }
                          error={errors.lastName && touched.lastName}
                        />

                        <HelperText
                          error={
                            errors.lastName &&
                            touched.lastName &&
                            errors.lastName
                          }
                          color="textColor"
                        >
                          {errors.lastName}
                        </HelperText>
                      </Box>
                    </Grid>
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
                          fullWidth
                          id="department"
                          label="Department"
                          name="department"
                          autoComplete="department"
                          value={values.department || ''}
                          onChange={event =>
                            setFieldValue('department', event.target.value)
                          }
                          error={errors.department && touched.department}
                        />

                        <HelperText
                          error={
                            errors.department &&
                            touched.department &&
                            errors.department
                          }
                          color="textColor"
                        >
                          {errors.department}
                        </HelperText>
                      </Box>
                    </Grid>
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
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
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
                          label="Password"
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
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                          color="textColor"
                        >
                          {errors.password}
                        </HelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button
                          className={classes.submit}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={register.loading}
                          endIcon={<ArrowForwardIcon />}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                    {(register.error || register.data) && (
                      <Grid item xs={10}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={resendOtp}
                            disabled={register.loading}
                          >
                            Resend OTP
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
            </Form>
          </Grid>
        </div>
      </Grid>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter OTP</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter verification code.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={e => setCode(e.target.value)}
              value={code}
              margin="dense"
              id="code"
              label="Enter code"
              type="code"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitCode} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
}

const { func, oneOfType, object, string } = PropTypes;
SignUpPage.propTypes = {
  dispatch: func,
  doRegister: oneOfType([func, object, string]),
  register: oneOfType([func, object, string]),
  doResetRegisterData: oneOfType([func, object, string]),
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    doRegister: registerData,
    doResetRegisterData: registerDataReset,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SignUpPage);
