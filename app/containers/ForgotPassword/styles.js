import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(4, 3),
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
    borderRadius: '50px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    padding: '15px 0px',
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
    margin: theme.spacing(6, 0, 0, 0),
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
}));
