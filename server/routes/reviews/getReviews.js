const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  const {
    query: { drinkId },
  } = req;

  const dbQuery = {
    ...(drinkId && { drinkId }),
  };

  console.log('req.query', req.query);
  console.log('dbQuery', dbQuery);

  const reviews = await Review.find(dbQuery);
  if (!reviews || !reviews.length)
    throw createHttpError(404, 'no reviews found');

  res.status(200).json({
    success: true,
    reviews,
  });
});
