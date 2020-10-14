import React, { useEffect, useMemo } from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getMuiTheme } from '../../muiThemes';
import AppToolbar from '../AppToolbar';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import RootSwitch from './RootSwitch';
import { fetchDrinksOptId } from '../../Redux/slices/drinks';
import ReviewDialog from '../ReviewComponents/ReviewDialog';
import { useTypedSelector } from '../../Redux/store';

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: {
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

  const theme = useMemo(() => {
    return getMuiTheme(useDark);
  }, [useDark]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppToolbar />
      <div className={muiClasses.toolbarSpacer} />
      <RootSwitch />
      <ReviewDialog />
    </ThemeProvider>
  );
};

export default AppRoot;
