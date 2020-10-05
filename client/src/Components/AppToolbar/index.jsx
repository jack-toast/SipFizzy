import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Face } from '@material-ui/icons';
import styles from './styles.module.scss';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" color="transparent" elevation={1}>
      <Toolbar>
        <NavLink to="/" className={styles.NavLink}>
          <Typography variant="h5">Sip Fizzy</Typography>
        </NavLink>
        <NavLink
          to="/drinks"
          className={clsx(styles.NavLink, styles.SecondaryLink)}
        >
          <Typography variant="h6">Drinks</Typography>
        </NavLink>
        <NavLink
          to="/account"
          className={styles.NavLink}
          style={{ marginLeft: 'auto' }}
        >
          <Face color="inherit" />
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
