import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#3A57E8',
    },
    secondary: {
      main: '#543884',
    },
    error: {
      main: red.A400,
    },
  },
});
