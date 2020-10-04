const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.reviewId });
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
