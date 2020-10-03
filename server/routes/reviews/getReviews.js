const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  if (!reviews || !reviews.length)
    throw createHttpError(404, 'no reviews found');

  res.status(200).json({
    success: true,
    reviews,
  });
});
