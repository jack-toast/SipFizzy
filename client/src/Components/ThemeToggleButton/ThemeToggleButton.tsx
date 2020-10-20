import React from 'react';
import { IconButton } from '@material-ui/core';
import { Brightness2Rounded, Brightness7Rounded } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../Redux/slices/themeSlice';
import { useTypedSelector } from '../../Redux/store';

const ThemeToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const useDark = useTypedSelector((state) => state.theme.useDark);
  const handleClickThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <IconButton color="inherit" onClick={handleClickThemeToggle} data-testid="theme-toggle-button">
      {useDark ? <Brightness7Rounded /> : <Brightness2Rounded />}
    </IconButton>
  );
};

export default ThemeToggleButton;
