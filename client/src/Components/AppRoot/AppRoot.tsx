import React, { useEffect, useMemo } from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { getMuiTheme } from '../../muiThemes';
import AppToolbar from '../AppToolbar/AppToolbar';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import { fetchDrinksOptId } from '../../Redux/slices/drinks';
import ReviewDialog from '../ReviewComponents/ReviewDialog/ReviewDialog';
import { useTypedSelector } from '../../Redux/store';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import CreateDrinkView from '../../Views/CreateDrinkView/CreateDrinkView';
import AccountView from '../../Views/AccountView/AccountView';
import HomeView from '../../Views/HomeView/HomeView';

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
    (async () => dispatch(fetchDrinksOptId({})))();
    return undefined;
  }, [dispatch]);

  const theme = useMemo(() => {
    return getMuiTheme(useDark);
  }, [useDark]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReviewDialog />
      <AppToolbar />
      <div className={muiClasses.toolbarSpacer} />
      <Switch>
        <PrivateRoute waitForError path="/createdrink">
          <CreateDrinkView />
        </PrivateRoute>
        <Route path="/account">
          <AccountView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default AppRoot;
