const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drink.model');

module.exports = ash(async (req, res) => {
  const drinks = await Drink.find({});
  // const drinks = await Drink.deleteMany({});
  if (!drinks || !drinks.length) throw createHttpError(404, 'no drinks found');

  res.status(200).json({
    success: true,
    drinks,
  });
});
