/**
 *
 * Test
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { Paper, Grid, Typography } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Link from '@material-ui/core/Link';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { push } from 'connected-react-router';

import { useStyles } from './styles';

function ResetPasswordPage({ dispatch }) {
  const classes = useStyles();

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
                  WELCOME TO React-Cognito-Start-Kit
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="subtitle1"
                  className={classes.subtitle}
                >
                  Select below action to continue
                </Typography>
              </Grid>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => dispatch(push('/login'))}
                  size="large"
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => dispatch(push('/signup'))}
                  size="large"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid> 
          </Grid>
        </div>
      </Grid>
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
