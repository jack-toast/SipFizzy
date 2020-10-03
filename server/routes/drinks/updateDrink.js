const ash = require('express-async-handler');
const flatten = require('flat');
const createHttpError = require('http-errors');
const { isEmpty } = require('lodash');
const Drink = require('../../models/drink.model');

/**
 * Note: Why use findOneAndUpdate vs findOne -> modify -> save ?
 * When running the dev server locally I saw a ~40 ms difference in response time...
 * at the client side, so I figure I should save the time.
 *
 * I am returnign the new version of the drink, so the client will still get...
 * ... a response with the newest version of the entry they're modifying.
 */

module.exports = ash(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a drink');

  const {
    abv,
    calories,
    editedBy,
    flavors,
    name,
    numRatings,
    ratings = {},
  } = body;

  const update = {
    abv,
    calories,
    editedBy,
    flavors,
    name,
    numRatings,
    ...(!isEmpty(ratings) && flatten({ ratings })),
  };
  req.log.debug({ update }, `updating drink: ${req.params.drinkId}`);

  const updatedDrink = await Drink.findOneAndUpdate(
    { _id: req.params.drinkId },
    update,
    { new: true, omitUndefined: true }
  );

  if (!updatedDrink) {
    throw createHttpError(404, 'Drink not found');
  }

  res.status(200).json({
    success: true,
    message: 'drink updated',
    drink: updatedDrink,
  });
});
