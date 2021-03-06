import React from 'react';
import { Container } from '@material-ui/core';
import FadeProgressBar from '../../Components/FadeProgressBar/FadeProgressBar';
import { useTypedSelector } from '../../Redux/store';
import TopDrinks from './TopDrinks/TopDrinks';

const HomeView: React.FC = () => {
  const { loading } = useTypedSelector((state) => state.drinks);

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

export default HomeView;
