const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../models/drinkModel');

// Create (await)
const createDrink = ash(async (req, res) => {
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
    id: drink._id,
    drink,
  });
});

// Read (one)
const getDrinkByID = ash(async (req, res) => {
  const drink = await Drink.findById(req.params.id);
  if (!drink) throw createHttpError(404, 'drink not found');

  res.status(200).json({
    success: true,
    drink,
  });
});

// Read (all)
const getDrinks = ash(async (req, res) => {
  const drinks = await Drink.find({});
  if (!drinks || !drinks.length) throw createHttpError(404, 'no drinks found');

  res.status(200).json({
    success: true,
    drinks,
  });
});

// Update
const updateDrink = ash(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a drink');

  const drink = await Drink.findById(req.params.id);
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

// Delete
const deleteDrinkByID = ash(async (req, res) => {
  const drink = await Drink.findOneAndDelete({ _id: req.params.id });
  if (!drink) {
    throw createHttpError(404, `No drink found with id ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    drink,
  });
});

module.exports = {
  createDrink,
  getDrinkByID,
  getDrinks,
  updateDrink,
  deleteDrinkByID,
};
