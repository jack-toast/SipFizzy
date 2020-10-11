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
    salty: 6.9,
    umami: 6.9,
    bitter: 6.9,
  },
  score: 69,
};

const updateDrinkInfo = async (drink, reviews) => {
  // console.log('drink', drink);
  // console.log(`reviews for ${drink._id}`, reviews);
  // if (!reviews.length) {
  //   drink.numRatings = defaultVals.numRatings;
  //   drink.qualities = defaultVals.qualities;
  //   drink.score = defaultVals.score;

  //   console.log('drink (no reviews)', drink);
  //   // try {
  //   //   const saveRes = await drink.save();
  //   //   console.log(`save drink ${drink.id}`, saveRes);
  //   // } catch (err) {
  //   //   console.log('err', err);
  //   // }
  //   // return;
  // }
  const numRatings = reviews.length;
  console.log('numRatings', numRatings);
  if (numRatings === 0) {
    drink.numRatings = numRatings;
    drink.score = defaultVals.score;
    drink.qualities = { ...defaultVals.qualities };
  } else {
    const newScore = reviews.reduce((ret, curr) => ret + curr, 0) / numRatings;
    const newQualities = reviews.reduce(
      (ret, { qualities }, index) => {
        return getObjIncAvg(index, ret, qualities);
      },
      { ...defaultVals.qualities }
    );
    drink.numRatings = numRatings;
    drink.score = newScore;
    drink.qualities = newQualities;
  }

  // console.log(`numR(${numRatings}) - drink ${drink.id}`, drink);
  // try {
  //   const drinkSaveRes = await drink.save();
  //   console.log(`drink save ${drink.name}`, drinkSaveRes);
  // } catch (err) {
  //   console.log('err', err);
  // }
};

module.exports = ash(async (req, res) => {
  const drinks = await Drink.find({});
  const reviews = await Review.find({});
  if (!drinks || !drinks.length) throw createHttpError(404, 'no drinks found');

  // we need to update numRatings, score, and qualities

  console.log('reviews', reviews);
  console.log('drinks', drinks);

  drinks.forEach((drink) => {
    updateDrinkInfo(
      drink,
      // eslint-disable-next-line no-underscore-dangle
      [...reviews.filter((r) => drink._id === r.drinkId)]
    );
  });

  res.status(200).json({
    success: true,
    message: 'we dun did it',
  });
});
