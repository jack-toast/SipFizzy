const asyncHandler = require('express-async-handler');
const flatten = require('flat');
const createHttpError = require('http-errors');
const { isEmpty } = require('lodash');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a review');

  const { title, description, ratings = {}, meta = {} } = body;

  const update = {
    $set: {
      title,
      description,
      ...(!isEmpty(ratings) && flatten({ ratings })),
      ...(!isEmpty(meta) && flatten({ meta }, { maxDepth: 2 })),
    },
  };
  req.log.debug({ update }, `updating review ${req.params.reviewId}`);

  const updatedReview = await Review.findOneAndUpdate(
    { _id: req.params.reviewId },
    update,
    { new: true, omitUndefined: true }
  );

  if (!updatedReview) {
    throw createHttpError(404, 'Review not found');
  }

  res.status(200).json({
    success: true,
    message: 'review updated',
    review: updatedReview,
  });
});
