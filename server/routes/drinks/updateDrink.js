const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drinkModel');

module.exports = ash(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a drink');

  const drink = await Drink.findById(req.params.drinkId);
  if (!drink) throw createHttpError(404, 'Drink not found');

  const { name, rating } = body;
  if (name) drink.name = name;
  if (rating) drink.rating = rating;

  const saveResp = await drink.save();
  if (!saveResp) throw createHttpError(500, 'failed to update existing drink');
  res.status(200).json({
    success: true,
    message: 'drink updated',
    drink: saveResp,
  });
});
