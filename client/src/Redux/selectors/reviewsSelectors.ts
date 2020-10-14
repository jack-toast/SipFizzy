import { filter, has, isEqual } from 'lodash';

import { createSelectorCreator, defaultMemoize } from 'reselect';
import { Review } from '../../MyTypes/review';
import { RootState } from '../store';

const createMemoSelector = createSelectorCreator(defaultMemoize, isEqual);

type ReviewsObjType = {
  [key: string]: Review;
};
const selectReviews = (state: RootState): ReviewsObjType => state.reviews.reviews;

const selectReviewsLoadingForDrink = createMemoSelector(
  (state: RootState) => state.reviews.activeDrinkMap,
  (_: RootState, drinkId: string) => drinkId,
  (activeDrinkMap, drinkId) => has(activeDrinkMap, drinkId),
);

const makeSelectReviewsForDrink = () =>
  createMemoSelector(
    selectReviews,
    (_: RootState, drinkId: string) => drinkId,
    (reviews, drinkId) => {
      return filter(reviews, (r) => r.drinkId === drinkId);
    },
  );

export { selectReviews, makeSelectReviewsForDrink, selectReviewsLoadingForDrink };
