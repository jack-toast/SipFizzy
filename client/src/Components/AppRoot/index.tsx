import React, { useEffect } from 'react';
import { MuiThemeProvider, CssBaseline, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { MUI_DARK_THEME, MUI_LIGHT_THEME } from '../../muiThemes';
import AppToolbar from '../AppToolbar';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import RootSwitch from './RootSwitch';
import { fetchDrinksOptId } from '../../Redux/slices/drinks';
import ReviewDialog from '../ReviewComponents/ReviewDialog';
import { useTypedSelector } from '../../Redux/store';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
    ...theme.mixins.toolbar,
  },
}));

const AppRoot: React.FC = () => {
  const muiClasses = useStyles();
  const useDark = useTypedSelector((state) => state.theme.useDark);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => dispatch(fetchCurrentUser()))();
    (async () => dispatch(fetchDrinksOptId()))();
    return undefined;
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={useDark ? MUI_DARK_THEME : MUI_LIGHT_THEME}>
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
