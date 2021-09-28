import { makeStyles } from '@material-ui/core/styles';

import bgImage from '!file-loader?name=[name].[ext]!../../images/bg_v2.jpg';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  logoImage: {
    // backgroundImage: 'url(' + logoImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '200px',
    height: '71px',
  },
  image: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  },
  paper: {
    margin: theme.spacing(8, 12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '15px 0px',
    borderRadius: '50px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  button: {
    borderRadius: '50px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  header: {
    margin: theme.spacing(0, 0, 6, 0),
  },
  textfd: {
    boxShadow:
      '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '5px',
  },
  footer: {
    margin: theme.spacing(8, 0, 0, 0),
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#A0A3A8',
  },
  link: {
    fontStyle: 'italic',
  },
  sideGrid: {
    overflowX: 'auto',
    height: '100%',
  },
}));
