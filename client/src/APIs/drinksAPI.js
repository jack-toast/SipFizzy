const { default: ky } = require('ky');

const baseURL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line no-unused-vars
const getDrinks = async () => {
  console.log('process.env', process.env);
  const res = await ky(`${baseURL}/drinks`).json();
  return res;
};

const getDrinkById = async ({ drinkId }) => {
  const res = await ky(`${baseURL}/drinks/${drinkId}`).json();
  console.log('res', res);
  return res;
};

export { getDrinks, getDrinkById };
