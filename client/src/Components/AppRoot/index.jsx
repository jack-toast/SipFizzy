import React, { useEffect } from 'react';
import { MuiThemeProvider, CssBaseline, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MUI_LIGHT_THEME } from '../../muiThemes';
import AppToolbar from '../AppToolbar';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import RootSwitch from './RootSwitch';
import { fetchDrinks } from '../../Redux/slices/drinks';
import ReviewDialog from '../ReviewDialog';

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

console.log('MUI_LIGHT_THEME', MUI_LIGHT_THEME);

const AppRoot = () => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => dispatch(fetchCurrentUser()))();
    (async () => dispatch(fetchDrinks()))();
    return () => {};
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={MUI_LIGHT_THEME}>
      <CssBaseline />
      <AppToolbar />
      <div>
        <div className={muiClasses.toolbar} />
        <RootSwitch />
      </div>
      <ReviewDialog />
    </MuiThemeProvider>
  );
};

export default AppRoot;
