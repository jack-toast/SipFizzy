import { Drink } from '../../MyTypes/drink';
import { RootState } from '../store';

type DrinksObjType = {
  [key: string]: Drink;
};
const selectDrinks = (state: RootState): DrinksObjType => state.drinks.drinks;

export { selectDrinks };
