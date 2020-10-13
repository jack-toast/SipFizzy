/* eslint-disable no-param-reassign */
const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const { getObjIncAvg } = require('../../helpers/incAverageHelper');
const Drink = require('../../models/drink.model');
const Review = require('../../models/review.model');

const defaultVals = {
  numRatings: 0,
  qualities: {
    flavorAccuracy: 6.9,
    flavorIntensity: 6.9,
    bubbles: 6.9,
    body: 6.9,
    smell: 6.9,
    sweetness: 6.9,
    sour: 6.9,
    bitter: 6.9,
  },
  score: 69,
};

const updateDrinkInfo = async (drink, reviews) => {
  const numRatings = reviews.length;
  if (numRatings === 0) {
    drink.numRatings = 0;
    drink.score = defaultVals.score;
    drink.qualities = { ...defaultVals.qualities };
  } else {
    drink.score =
      reviews.reduce((ret, curr) => ret + curr.score, 0) / numRatings;
    drink.qualities = reviews.reduce((acc, currentReview, index) => {
      return getObjIncAvg(index, acc, currentReview.qualities.toObject());
    }, defaultVals.qualities);
    drink.numRatings = numRatings;
  }

  return drink.save();
};

module.exports = ash(async (req, res) => {
  const drinks = await Drink.find({});
  const reviews = await Review.find({});
  if (!drinks || !drinks.length) throw createHttpError(404, 'no drinks found');

  const savePromises = await Promise.allSettled(
    drinks.map((drink) =>
      updateDrinkInfo(
        drink,
        reviews.filter((r) => r.drinkId.toString() === drink.id)
      )
    )
  );

  const failedSaves = savePromises
    .filter(({ status }) => status !== 'fulfilled')
    .map(({ reason }) => reason.message || reason);

  res.status(200).json({
    success: true,
    message: `sync complete. num errors: ${failedSaves.length}`,
    errors: failedSaves,
  });
});
