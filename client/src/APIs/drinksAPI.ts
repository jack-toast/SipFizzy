import kyUseKey from './kyUseKey';

import ky from 'ky';
import { Drink, NewDrink } from '../MyTypes/drink';

const baseURL = process.env.REACT_APP_API_URL;

type GetDrinksResponse = {
  success: boolean;
  drinks: Drink[];
};

export const getDrinksOptId = async ({ drinkId = '' } = {}): Promise<GetDrinksResponse> => {
  let reqURL = `${baseURL}/drinks`;
  if (!!drinkId) reqURL = `${reqURL}/${drinkId}`;
  const res = await ky(reqURL).json();
  return res as GetDrinksResponse;
};

export const syncDrinkScoresAPI = async () => {
  const res = await kyUseKey(`${baseURL}/drinks/syncScores`, {
    throwHttpErrors: false,
  }).json();
  return res;
};

export const createDrinkAPI = async (newDrink: NewDrink) => {
  const res = await kyUseKey
    .post(`${baseURL}/drinks`, {
      json: { ...newDrink },
    })
    .json();
  return res;
};
