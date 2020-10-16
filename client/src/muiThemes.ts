/**
 * Theme for the whole app. Should avoid the need to style component by component
 */

import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

export const getMuiTheme = (useDark = false): Theme => {
  return responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: {
          main: '#DB3267',
        },
        secondary: {
          main: '#2B6FE9',
        },
        type: useDark ? 'dark' : 'light',
      },
    }),
  );
};

export const drawerWidth = 240;

export const maxInputWidth = 500;
