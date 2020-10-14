import React, { useEffect } from 'react';
import { Collapse, Container, useTheme } from '@material-ui/core';
import FadeProgressBar from '../../Components/FadeProgressBar';
import { useTypedSelector } from '../../Redux/store';
import TopDrinks from './TopDrinks';
import { isEmpty } from 'lodash';

const HomeView: React.FC = () => {
  const theme = useTheme();
  const { loading } = useTypedSelector((state) => state.drinks);

  useEffect(() => {
    console.log('theme', theme);
    return undefined;
  }, [theme]);

  return (
    <>
      <FadeProgressBar active={loading !== 'idle'} />
      <Container maxWidth="sm">
        <div style={{ padding: '1rem' }} />
        <TopDrinks />
      </Container>
    </>
  );
};

HomeView.propTypes = {};

export default HomeView;
