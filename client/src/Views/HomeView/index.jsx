import { Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import FadeProgressBar from '../../Components/FadeProgressBar';
import TopDrinks from './TopDrinks';

const HomeView = () => {
  const { loading } = useSelector((state) => state.drinks);
  return (
    <>
      <FadeProgressBar active={loading !== 'idle'} />
      <Container maxWidth="md">
        <TopDrinks />
      </Container>
    </>
  );
};

HomeView.propTypes = {};

export default HomeView;
