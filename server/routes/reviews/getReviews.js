const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const Review = require('../../models/review.model');
const User = require('../../models/user.model');

const updateReviewUsername = async (review) => {
  const { userId } = review;
  if (!userId) return;
  const user = await User.findById(userId).select('username');
  if (!user) return;
  // eslint-disable-next-line no-param-reassign
  review.username = user.username;
  review.save();
};

module.exports = asyncHandler(async (req, res) => {
  const {
    query: { drinkId },
  } = req;

  // Either querying all reviews or just those for a certain drink.
  // Should add a limit if querying all reviews...
  const dbQuery = {
    ...(drinkId && { drinkId }),
  };

  const reviews = await Review.find(dbQuery);
  if (!reviews || !reviews.length)
    throw createHttpError(404, 'no reviews found');

  res.status(200).json({
    success: true,
    reviews,
  });

  // Make sure that all the reviews have a username field for the next request.
  // This will become obsolete because "username" is required now.
  reviews.forEach((review) => {
    if (review.username === undefined) updateReviewUsername(review);
  });
});
