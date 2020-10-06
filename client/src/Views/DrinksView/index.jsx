import React, { useEffect } from 'react';

import { Container, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { fetchDrinks } from '../../Redux/slices/drinks';
import styles from './styles.module.scss';
import DrinkRow from './DrinkRow';

const DrinksView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { loading, drinkOrder } = useSelector((state) => state.drinks);

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
      <Switch>
        <Route path={`${match.path}/:drinkId`}>
          <div>show details for drink</div>
        </Route>
        <Container maxWidth="md">
          {drinkOrder.map((drinkId) => {
            return <DrinkRow key={`drinks-row-${drinkId}`} drinkId={drinkId} />;
          })}
        </Container>
      </Switch>
    </>
  );
};

export default DrinksView;
