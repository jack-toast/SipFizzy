import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../../Views/Account';
import DrinksView from '../../Views/DrinksView';
import HomeView from '../../Views/HomeView';

const RootSwitch = () => (
  <Switch>
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
