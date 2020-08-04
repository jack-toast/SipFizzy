import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { BubbleChartOutlined } from '@material-ui/icons';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <BubbleChartOutlined />
        <Typography variant="h5">Fizzy Finder</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
