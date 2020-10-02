const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Drink = require('../../models/drinkModel');

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

  // defining the allowed update variables, sort of
  const {
    ratings,
    numRatings,
    abv,
    calories,
    flavors,
    createdBy,
    editedBy,
    name,
  } = body;

  const newDrink = await Drink.findOneAndUpdate(
    { _id: req.params.drinkId },
    {
      ...(name !== undefined && { name }),
      ...(ratings !== undefined && { ratings }),
      ...(numRatings !== undefined && { numRatings }),
      ...(abv !== undefined && { abv }),
      ...(calories !== undefined && { calories }),
      ...(flavors !== undefined && { flavors }),
      ...(createdBy !== undefined && { createdBy }),
      ...(editedBy !== undefined && { editedBy }),
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'drink updated',
    drink: newDrink,
  });
});
