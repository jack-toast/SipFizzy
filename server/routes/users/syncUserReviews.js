const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/user.model');
const Review = require('../../models/review.model');
const checkReviewsValid = require('../../helpers/checkReviewsValid');

module.exports = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ userId: req.params.userId });

  if (!reviews) throw createHttpError(404, 'no reviews found');

  const update = {
    ...(checkReviewsValid(reviews) && { reviews }),
  };

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.userId },
    update,
    { new: true, omitUndefined: true }
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    success: true,
    message: 'foo',
    user: updatedUser,
    reviews,
  });
});
