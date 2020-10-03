const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const Review = require('../../models/review.model');

module.exports = ash(async (req, res) => {
  const { body } = req;

  if (!body)
    throw createHttpError(400, 'you must provide a proper review object');

  // Prevent dupes
  const existingReview = await Review.findOne({
    userId: body.userId,
    drinkId: body.drinkId,
  });
  if (existingReview) {
    throw createHttpError(400, 'User already wrote a review for that drink');
  }

  // Create the new review
  const newReview = new Review(body);
  if (!newReview) throw createHttpError(400, 'couldnt create new review');

  // Save it
  const review = await newReview.save();
  if (!review) throw createHttpError(500, 'failed to save new review. sorry');

  // After saving the drink, we should do two things:
  // 1. Update the user's reviews array
  // 2. Update the average score for said drink.

  // Note: Store the number of reviews in the drink documents so we can do a easier averaging.
  // Do this instead of scanning all reviews when calculating the averages.
  // Maybe do a big sweeping scan every couple days, but that should only be useful for when...
  // ...we are deleting reviews.
  res.status(200).json({
    success: true,
    message: 'review created successfully',
    id: review.id,
    review,
  });
});
