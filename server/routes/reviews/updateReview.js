const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const Review = require('../../models/reviewModel');

module.exports = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a review');

  const review = await Review.findById(req.params.id);
  if (!review) throw createHttpError(404, 'Review not found');

  const { title, description, ratings, meta } = body;

  if (title) review.title = title;
  if (description) review.description = description;
  if (ratings) review.ratings = ratings;
  if (meta) review.meta = meta;

  const saveResp = await review.save();
  if (!saveResp) throw createHttpError(500, 'failed to update existing review');
  res.status(200).json({
    success: true,
    message: 'review updated',
    review: saveResp,
  });
});
