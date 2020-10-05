import React, { useEffect } from 'react';

import { Button, Container, LinearProgress, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { fetchDrinks } from '../../Redux/slices/drinks';
import styles from './styles.module.scss';

const DrinksView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { loading, drinks, drinkOrder } = useSelector((state) => state.drinks);

  const requestNewDrinks = async () => {
    try {
      const resp = await dispatch(fetchDrinks());
      if (resp.error) {
        enqueueSnackbar(resp.error.message || 'Failed to load drinks', {
          variant: 'error',
          autoHideDuration: 2000,
        });
        return;
      }
      enqueueSnackbar('Drinks Loaded', {
        autoHideDuration: 2000,
        variant: 'success',
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    requestNewDrinks();
    return () => {};
  }, []);

  return (
    <>
      <div
        className={clsx(styles.ProgressContainer, {
          [styles.show]: loading === 'pending',
        })}
      >
        <LinearProgress />
      </div>
      <Container maxWidth="md">
        <Button onClick={requestNewDrinks}>fetch drinks</Button>
        <div>
          {drinkOrder.map((drinkId) => {
            const drink = drinks[`${drinkId}`];
            // console.log('drink', drink);
            return <Paper key={`drinks-row-${drinkId}`}>{drink.name}</Paper>;
          })}
        </div>
      </Container>
    </>
  );
};

export default DrinksView;
