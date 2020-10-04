import React, { useEffect } from 'react';

import {
  Button,
  Collapse,
  Container,
  LinearProgress,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinks } from '../../Redux/slices/drinks';

const ReviewView = () => {
  const dispatch = useDispatch();
  const { loading, drinks, drinkOrder } = useSelector((state) => state.drinks);

  const requestNewDrinks = async () => {
    try {
      await dispatch(fetchDrinks());
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    requestNewDrinks();
    return () => {};
  }, []);

  return (
    <Container maxWidth="md">
      <Button onClick={requestNewDrinks}>fetch drinks</Button>
      <Collapse in={loading === 'pending'}>
        <LinearProgress />
      </Collapse>
      <div>
        {drinkOrder.map((drinkId) => {
          const drink = drinks[`${drinkId}`];
          // console.log('drink', drink);
          return <Paper key={`drinks-row-${drinkId}`}>{drink.name}</Paper>;
        })}
      </div>
    </Container>
  );
};

export default ReviewView;
