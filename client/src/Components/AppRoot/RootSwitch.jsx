import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../../Views/Account';
import CreateDrink from '../../Views/CreateDrink';
import DrinksView from '../../Views/DrinksView';
import HomeView from '../../Views/HomeView';
import PrivateRoute from '../PrivateRoute';

const RootSwitch = () => (
  <Switch>
    {/* <Route path="/createdrink">
      <CreateDrink />
    </Route> */}
    <PrivateRoute waitForError path="/createdrink">
      <CreateDrink />
    </PrivateRoute>
    <Route path="/drinks">
      <DrinksView />
    </Route>
    <Route path="/account">
      <Account />
    </Route>
    <Route path="/">
      <HomeView />
    </Route>
  </Switch>
);

export default RootSwitch;
