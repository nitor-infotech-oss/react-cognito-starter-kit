/**
 *
 * Test
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { push } from 'connected-react-router';
import { Paper, Grid, Typography, Box, Link } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import { loginData } from 'containers/App/actions';
import { makeSelectLogin } from 'containers/App/selectors';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Form from 'components/Form';
import HelperText from '@material-ui/core/FormHelperText';
import * as yup from 'yup';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useSnackbar } from 'notistack';

import { useStyles } from './styles';

function SignInPage({ dispatch, doLogin, auth }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const LoginValidationSchema = yup.object().shape({
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

  const onSubmit = ({ email, password }) => {
    // console.log('onSubmit', onSubmit);
    dispatch(doLogin({ email, password }));
  };

  useEffect(() => {
    // console.log('auth', auth);
    if (auth.data) {
      enqueueSnackbar('Logined Successfully!', {
        variant: 'success',
      });
      dispatch(push('/dashboard'));
    }
    if (auth.error) {
      enqueueSnackbar(auth.error.message, {
        variant: 'error',
      });
    }
  }, [auth]);

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
                  SIGN IN
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.subtitle}
                >
                  Please Enter your username and password to Sign In.
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Form
              validationSchema={LoginValidationSchema}
              onSubmit={values => onSubmit(values)}
              initialValues={{ email: '', password: '' }}
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
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
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
                      <Grid item xs>
                        <Link
                          color="inherit"
                          href="/resetPassword"
                          className={classes.subtitle}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid item xs={10}>
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
                          disabled={auth.loading}
                          endIcon={<ArrowForwardIcon />}
                          size="large"
                        >
                          Sign In
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
    </Grid>
  );
}

const { func, oneOfType, object, string } = PropTypes;
SignInPage.propTypes = {
  dispatch: func,
  doLogin: oneOfType([func, object, string]),
  auth: oneOfType([func, object, string]),
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    doLogin: loginData,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SignInPage);
