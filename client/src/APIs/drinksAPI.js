import { has } from 'lodash';

const { default: ky } = require('ky');

const baseURL = 'http://localhost:42069';

// eslint-disable-next-line no-unused-vars
const getDrinks = async (options = {}) => {
  const res = await ky(`${baseURL}/drinks`).json();
  return res;
};

const getDrinkById = async ({ drinkId }) => {
  const res = await ky(`${baseURL}/drinks/${drinkId}`).json();
  console.log('res', res);
  return res;
};

export { getDrinks, getDrinkById };
