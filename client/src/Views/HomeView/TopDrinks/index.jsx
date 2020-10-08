import React from 'react';
import { useSelector } from 'react-redux';
import DrinkRow from '../DrinkRow';

const TopDrinks = () => {
  const { drinkOrder } = useSelector((state) => state.drinks);
  return drinkOrder.map((drinkId) => {
    return <DrinkRow key={`drinks-row-${drinkId}`} drinkId={drinkId} />;
  });
};

export default TopDrinks;
