/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// import AccountIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { USER_POOL_ID, USER_POOL_WEB_CLIENT_ID } from 'utils/config';

import { Box, Badge, Typography } from '@material-ui/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { loginDataReset } from 'containers/App/actions';
import { makeSelectLogin } from 'containers/App/selectors';

import clsx from 'clsx';

import LanguageProvider from 'containers/LocaleToggle';
import { useStyles } from './styles';
import { sumerianSceneContainer } from '@aws-amplify/ui';

function Header({ doLogoutUser, dispatch, auth }) {
  // const [values, setValues] = useState({
  //   anchorEl: null,
  //   password: null,
  // });
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const theme = useTheme();

  // const isMenuOpen = Boolean(values.anchorEl);

  // const handleProfileMenuOpen = event => {
  //   setValues({ ...values, anchorEl: event.target });
  // };

  // const handleMenuClose = () => {
  //   setValues({ ...values, anchorEl: null });
  // };

  const poolData = {
    UserPoolId: USER_POOL_ID, // Your user pool id here
    ClientId: USER_POOL_WEB_CLIENT_ID, // Your client id here
  };

  const userPool = new CognitoUserPool(poolData);

  const handleLogout = () => {
    dispatch(doLogoutUser());
    return new Promise((success) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (cognitoUser !== null) {
      cognitoUser.signOut();
      }
      success();
      dispatch(push('/'));
    });
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getIdetification = () => {
    const data = auth.data.idToken.payload;
    return data.given_name
      ? `${data.given_name} ${data.family_name}`
      : data.email;
  };

  const signedIn = !!auth.data;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          className={classNames(classes.menuButton)}
          style={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon style={{ color: 'black' }} />
            </IconButton>
          </div>
          {signedIn && (
            <div>
              <Box
                alignItems="center"
                justifyContent="flex-end"
                display="flex"
                flex={1}
              >
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>

                <IconButton>
                  <Badge badgeContent={4} color="error">
                    <NotificationsActiveOutlinedIcon />
                  </Badge>
                </IconButton>

                <IconButton>
                  <SettingsIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <LanguageProvider />
                <Divider orientation="vertical" flexItem />
                <IconButton>
                  <PermIdentityIcon />
                </IconButton>
                <Box
                  justifyContent="flex-end"
                  display="flex"
                  flexDirection="column"
                  flex={1}
                >
                  <Typography style={{ color: 'black' }}>
                    {getIdetification()}
                  </Typography>
                  <Typography className={classes.subtitle}>
                    {'Welcome'}
                  </Typography>
                </Box>

                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>
                    <PowerSettingsNewIcon />
                    Sign Out
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon style={{ color: 'white' }} />
            ) : (
              <ChevronLeftIcon style={{ color: 'white' }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => dispatch(push('/dashboard'))}
            style={{ color: 'white' }}
          >
            <ListItemIcon>
              <TimelapseIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

const { func, node, oneOfType, object } = PropTypes;
Header.propTypes = {
  doLogoutUser: oneOfType([func, object, node]),
  // history: object.isRequired,
  // fullScreen: bool,
  dispatch: oneOfType([func, object, node]),
  auth: oneOfType([func, object, node]),
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    doLogoutUser: loginDataReset,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
