import React, { useEffect } from 'react';

import { Container, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { fetchDrinks } from '../../Redux/slices/drinks';
import styles from './styles.module.scss';
import DrinkRow from './DrinkRow';
import ReviewDialog from '../../Components/ReviewDialog';

const DrinksView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { loading, drinkOrder } = useSelector((state) => state.drinks);

  useEffect(() => {
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
      <ReviewDialog />
      <Container maxWidth="md">
        {drinkOrder.map((drinkId) => {
          return <DrinkRow key={`drinks-row-${drinkId}`} drinkId={drinkId} />;
        })}
      </Container>
    </>
  );
};

export default DrinksView;
