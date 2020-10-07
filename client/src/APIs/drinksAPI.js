import kyUseKey from './kyUseKey';

const { default: ky } = require('ky');

const baseURL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line no-unused-vars
export const getDrinks = async () => {
  const res = await ky(`${baseURL}/drinks`).json();
  return res;
};

export const getDrinkById = async ({ drinkId }) => {
  const res = await ky(`${baseURL}/drinks/${drinkId}`).json();
  return res;
};

export const createDrinkAPI = async ({ name, abv, calories, flavors }) => {
  const res = await kyUseKey
    .post(`${baseURL}/drinks`, {
      json: { name, abv, calories, flavors },
    })
    .json();
  console.log('create drink res', res);
  return res;
};
