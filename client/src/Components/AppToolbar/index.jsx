import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Face, LocalDrinkOutlined } from '@material-ui/icons';
import styles from './styles.module.scss';
import AccessControl from '../AccessControl';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <NavLink to="/" className={styles.NavLink}>
          <Typography variant="h5">Sip Fizzy</Typography>
        </NavLink>
        <div className={styles.RightItems}>
          <AccessControl waitForError>
            <NavLink to="/createdrink" className={styles.NavLink}>
              <LocalDrinkOutlined />
            </NavLink>
          </AccessControl>
          <NavLink to="/account" className={styles.NavLink}>
            <Face color="inherit" />
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
