import { Typography } from '@material-ui/core';
import React from 'react';
import DrinkRow from '../../../Components/DrinkRow/DrinkRow';
import { useTypedSelector } from '../../../Redux/store';

const TopDrinks: React.FC = () => {
  const { drinkOrder } = useTypedSelector((state) => state.drinks);
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
