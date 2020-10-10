const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const { isNumber } = require('lodash');
const Drink = require('../../models/drink.model');
const Review = require('../../models/review.model');
const User = require('../../models/user.model');

const getIncAvg = (numRatings, existingScore, newScore) => {
  // Short circuit any default values we may have given
  if (numRatings === 0 || !isNumber(existingScore)) return newScore;
  return existingScore + (newScore - existingScore) / numRatings;
};

const getObjIncAvg = (numRatings, existingQualities, newQualities) => {
  if (numRatings === 0) return { ...newQualities };
  const retQualities = {};
  Object.entries(newQualities).forEach(([key, newQual]) => {
    retQualities[key] = getIncAvg(numRatings, existingQualities[key], newQual);
  });
  return retQualities;
};

module.exports = ash(async (req, res) => {
  const { body } = req;

  if (!body)
    throw createHttpError(400, 'you must provide a proper review object');

  const { user: { id: userId } = { foo: 'bar' } } = req;

  if (!userId) throw createHttpError(401, 'sign in required');

  // Prevent dupes
  // Disabled because I don't want to make 5 accounts to flesh out the page...
  // const existingReview = await Review.findOne({
  //   userId,
  //   drinkId: body.drinkId,
  // });
  // if (existingReview) {
  //   throw createHttpError(400, 'User already wrote a review for that drink');
  // }

  // Create the new review
  const newReview = new Review({ ...body, userId });
  if (!newReview) throw createHttpError(400, 'couldnt create new review');

  // Save it
  const review = await newReview.save();
  if (!review) throw createHttpError(500, 'failed to save new review. sorry');

  res.status(200).json({
    success: true,
    message: 'review created successfully',
    id: review.id,
    review,
  });

  const { drinkId, qualities: bodyQualities, score: bodyScore } = body;
  const drink = await Drink.findById(drinkId);
  const { numRatings = 0, qualities = {}, score = 0 } = drink;
  const newScore = getIncAvg(numRatings + 1, score, bodyScore);
  const newQualities = getObjIncAvg(numRatings + 1, qualities, bodyQualities);

  drink.score = newScore;
  drink.qualities = newQualities;
  drink.numRatings = numRatings + 1;

  drink.save();

  // also need to update the user's reviews array
  const user = await User.findById(userId);
  user.reviews.push(newReview.id);
  user.save();
});
