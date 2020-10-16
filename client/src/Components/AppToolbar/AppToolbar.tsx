import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Brightness2Rounded,
  Brightness7Rounded,
  Face,
  LocalDrinkOutlined,
} from '@material-ui/icons';
import styles from './AppToolbar.module.scss';
import AccessControl from '../AccessControl';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../Redux/slices/themeSlice';
import { useTypedSelector } from '../../Redux/store';

const AppToolbar: React.FC = () => {
  const history = useHistory();
  const useDark = useTypedSelector((state) => state.theme.useDark);
  const dispatch = useDispatch();
  const handleClickThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <NavLink to="/" className={styles.NavLink}>
          <Typography variant="h5">Sip Fizzy</Typography>
        </NavLink>
        <div className={styles.RightItems}>
          <AccessControl>
            <IconButton onClick={() => history.push('/createdrink')}>
              <LocalDrinkOutlined />
            </IconButton>
          </AccessControl>
          <IconButton onClick={() => history.push('/account')}>
            <Face />
          </IconButton>
          <IconButton onClick={handleClickThemeToggle}>
            {useDark ? <Brightness7Rounded /> : <Brightness2Rounded />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
