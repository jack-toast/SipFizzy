/**
 * Theme for the whole app. Should avoid the need to style component by component
 */

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { pink, cyan, amber, indigo } from '@material-ui/core/colors';

const baseTheme = {
  typography: {
    useNextVariants: true,
  },
};

export const MUI_LIGHT_THEME = responsiveFontSizes(
  createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: pink,
      secondary: indigo,
      type: 'light',
      background: {
        default: '#f4f4f4',
      },
    },
  })
);

export const MUI_DARK_THEME = responsiveFontSizes(
  createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: cyan,
      secondary: amber,
      type: 'dark',
      background: {
        default: '#212121',
        paper: '#333',
      },
    },
  })
);

export const drawerWidth = 240;

export const maxInputWidth = 500;
