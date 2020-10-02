/* eslint-disable no-underscore-dangle */
const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drinkModel');

// Create (await)
module.exports = ash(async (req, res) => {
  const { body } = req;

  if (!body)
    throw createHttpError(400, 'you must provide a proper drink object');

  const newDrink = new Drink(body);
  if (!newDrink) throw createHttpError(400, 'couldnt create new drink');

  const drink = await newDrink.save();
  if (!drink) throw createHttpError(500, 'failed on newDrink.save()');

  res.status(200).json({
    success: true,
    message: 'drink created successfully',
    id: drink.id,
    drink,
  });
});
