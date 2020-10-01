const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drinkModel');

module.exports = ash(async (req, res) => {
  const drink = await Drink.findOneAndDelete({ _id: req.params.drinkId });
  if (!drink) {
    throw createHttpError(404, `No drink found with id ${req.params.drinkId}`);
  }

  res.status(200).json({
    success: true,
    drink,
  });
});
