import React from 'react';
// import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
    padding: '1rem',
    display: 'flex',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px  #A0A3A8',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div style={{ color: 'black' }}>
        &copy; {new Date(Date.now()).getFullYear()} All
        Rights Reserved
      </div>
    </div>
  );
}

// Footer.propTypes = {
// width: PropTypes.string,
// };

export default Footer;
