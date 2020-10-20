import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Face, LocalDrinkOutlined } from '@material-ui/icons';
import styles from './AppToolbar.module.scss';
import AccessControl from '../AccessControl';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';

const AppToolbar: React.FC = () => {
  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <NavLink to="/" className={styles.NavLink}>
          <Typography variant="h5">Sip Fizzy</Typography>
        </NavLink>
        <div className={styles.RightItems}>
          {/* Use custom store to give access in tests */}
          <AccessControl>
            <NavLink to="/createDrink">
              <IconButton color="inherit">
                <LocalDrinkOutlined />
              </IconButton>
            </NavLink>
          </AccessControl>
          <NavLink to="/account">
            <IconButton color="inherit">
              <Face />
            </IconButton>
          </NavLink>
          <ThemeToggleButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
