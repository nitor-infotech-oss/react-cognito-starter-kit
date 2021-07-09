import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#41c9d0',
      main: '#2073FF',
      dark: '#25406B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#506688',
      main: '#25406B',
      dark: '#192c4a',
    },
    text: {
      primary: '#666',
    },
    background: {
      default: '#f2f2f2',
    },
    button: {
      error: '#f44336',
    },
  },

  typography: {
    useNextVariants: true,
    // fontFamily: 'Source Sans Pro',
  },
});

export default theme;
