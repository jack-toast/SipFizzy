const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const { get } = require('lodash');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  const query = {
    _id: req.params.reviewId,
    ...(!get(req, 'user.isAdmin') && { userId: req.user.id }),
  };
  const review = await Review.findOneAndDelete(query);
  if (!review) {
    throw createHttpError(
      404,
      `No review found with id ${req.params.reviewId}`
    );
  }

  res.status(200).json({
    success: true,
    review,
  });
});
