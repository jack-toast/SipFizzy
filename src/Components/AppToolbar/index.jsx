import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

const AppToolbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <div>FizzyFinder</div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
