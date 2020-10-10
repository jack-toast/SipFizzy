import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {
  Brightness2Rounded,
  Brightness5Rounded,
  Face,
  LocalDrinkOutlined,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import AccessControl from '../AccessControl';
import { toggleTheme } from '../../Redux/slices/theme';

const AppToolbar = () => {
  const dispatch = useDispatch();
  const useDark = useSelector((state) => state.theme.useDark);
  const handleToggleTheme = () => dispatch(toggleTheme());
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
          <div
            className={styles.NavLink}
            onClick={handleToggleTheme}
            role="button"
            tabIndex={0}
            onKeyDown={({ key }) => {
              if (key === 'Enter') handleToggleTheme();
            }}
          >
            {useDark ? <Brightness5Rounded /> : <Brightness2Rounded />}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
