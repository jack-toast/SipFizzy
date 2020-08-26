import React from 'react';
import { MuiThemeProvider, CssBaseline, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { MUI_LIGHT_THEME } from '../../muiThemes';
import AppToolbar from '../AppToolbar';
import HomeView from '../../Views/HomeView';
import ReviewView from '../../Views/ReviewView';

const useStyles = makeStyles((theme) => ({
  // '@global': {
  //   '*::-webkit-scrollbar': {
  //     width: '0.4em',
  //   },
  //   '*::-webkit-scrollbar-track': {
  //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  //   },
  //   '*::-webkit-scrollbar-thumb': {
  //     backgroundColor: 'rgba(0,0,0,.1)',
  //     outline: '1px solid slategrey',
  //   },
  // },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
    ...theme.mixins.toolbar,
  },
}));

const AppRoot = () => {
  const muiClasses = useStyles();
  return (
    <MuiThemeProvider theme={MUI_LIGHT_THEME}>
      <CssBaseline />
      <AppToolbar />
      <div>
        <div className={muiClasses.toolbar} />
        <Switch>
          <Route path="/review">
            <ReviewView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </div>
    </MuiThemeProvider>
  );
};

export default AppRoot;
