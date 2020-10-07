/* eslint-disable no-underscore-dangle */
const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drink.model');
const User = require('../../models/user.model');

// Create (await)
module.exports = ash(async (req, res) => {
  const { body } = req;

  console.log('req.user', req.user);
  console.log('req.body', req.body);

  if (!body)
    throw createHttpError(400, 'you must provide a proper drink object');

  const { user: { id: userId } = { foo: 'bar' } } = req;

  const userIsAdmin = await User.findById(userId).select('isAdmin');

  if (!userId) throw createHttpError(401, 'sign in required');
  if (!userIsAdmin) throw createHttpError(401, 'Only admins can add drinks');

  const newDrink = new Drink(body);
  if (!newDrink) throw createHttpError(400, 'couldnt create new drink');

  newDrink.createdBy = userId;
  newDrink.editedBy = userId;

  const drink = await newDrink.save();
  if (!drink) throw createHttpError(500, 'failed on newDrink.save()');

  res.status(200).json({
    success: true,
    message: 'drink created successfully',
    id: drink.id,
    drink,
  });
});
