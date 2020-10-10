import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import DrinkRow from '../DrinkRow';

const TopDrinks = () => {
  const { drinkOrder } = useSelector((state) => state.drinks);
  if (!drinkOrder.length) return null;

  return (
    <>
      <Typography gutterBottom variant="h4">
        Top Drinks
      </Typography>
      {drinkOrder.map((drinkId) => (
        <DrinkRow key={`drinks-row-${drinkId}`} drinkId={drinkId} />
      ))}
    </>
  );
};

export default TopDrinks;
