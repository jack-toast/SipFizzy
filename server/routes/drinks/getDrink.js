const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drink.model');

module.exports = ash(async (req, res) => {
  const drink = await Drink.findById(req.params.drinkId);
  if (!drink) throw createHttpError(404, 'drink not found');

  res.status(200).json({
    success: true,
    drink,
    drinks: [drink],
  });
});
