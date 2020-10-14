import kyUseKey from './kyUseKey';

import ky from 'ky';

const baseURL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line no-unused-vars
export const getDrinks = async () => {
  const res = await ky(`${baseURL}/drinks`).json();
  return res;
};

export const getDrinksOptId = async ({ drinkId } = {}) => {
  const res = await ky(`${baseURL}/drinks${drinkId ? `/${drinkId}` : ''}`).json();
  return res;
};

export const getDrinkById = async ({ drinkId }) => {
  const res = await ky(`${baseURL}/drinks/${drinkId}`).json();
  return res;
};

export const syncDrinkScoresAPI = async () => {
  const res = await kyUseKey(`${baseURL}/drinks/syncScores`, {
    throwHttpErrors: false,
  }).json();
  return res;
};

export const createDrinkAPI = async ({ name, abv, calories, flavors }) => {
  const res = await kyUseKey
    .post(`${baseURL}/drinks`, {
      json: { name, abv, calories, flavors },
    })
    .json();
  return res;
};
