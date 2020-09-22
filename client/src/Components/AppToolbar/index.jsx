import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { BubbleChartOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <NavLink to="/" className={styles.HomeButton}>
          <BubbleChartOutlined />
          <Typography variant="h5">Fizzy Finder</Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
