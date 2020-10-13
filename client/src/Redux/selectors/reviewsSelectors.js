import { filter, has, isEqual } from 'lodash';

import { createSelectorCreator, defaultMemoize } from 'reselect';

const createMemoSelector = createSelectorCreator(defaultMemoize, isEqual);

const selectReviews = (state) => state.reviews.reviews;

const selectReviewsLoadingForDrink = createMemoSelector(
  (state) => state.reviews.activeDrinkMap,
  (_, drinkId) => drinkId,
  (activeDrinkMap, drinkId) => has(activeDrinkMap, drinkId),
);

const makeSelectReviewsForDrink = () =>
  createMemoSelector(
    selectReviews,
    (_, drinkId) => drinkId,
    (reviews, drinkId) => {
      return filter(reviews, (r) => r.drinkId === drinkId);
    },
  );

export { selectReviews, makeSelectReviewsForDrink, selectReviewsLoadingForDrink };
