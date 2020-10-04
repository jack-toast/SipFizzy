import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { BubbleChartOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './styles.module.scss';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <NavLink to="/" className={styles.NavLink}>
          <BubbleChartOutlined />
          <Typography variant="h5">Fizzy Finder</Typography>
          <BubbleChartOutlined />
        </NavLink>
        <NavLink
          to="/review"
          className={clsx(styles.NavLink, styles.SecondaryLink)}
        >
          <Typography variant="h6">Reviews</Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
