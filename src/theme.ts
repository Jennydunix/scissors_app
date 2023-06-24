import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    },
    secondary: {
      main: '#03142F',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    button: {
      textTransform: 'capitalize',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

const updatedTheme: Theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default updatedTheme;
