import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { has } from 'lodash';
import { makeSelectReviewsForDrink } from '../../Redux/selectors/reviewsSelectors';
import ReviewRow from '../ReviewRow';
import { fetchReviews } from '../../Redux/slices/reviews';

const DrinkReviews = ({ drinkId }) => {
  const dispatch = useDispatch();
  const selectReviewsForDrink = useMemo(makeSelectReviewsForDrink, []);
  const reviews = useSelector((state) => selectReviewsForDrink(state, drinkId));
  const activeDrinkMap = useSelector((state) => state.reviews.activeDrinkMap);
  useEffect(() => {
    if (has(activeDrinkMap[drinkId])) return undefined;
    dispatch(fetchReviews({ drinkId }));
    return () => {};
  }, []);
  return reviews.map((review) => <ReviewRow review={review} key={review.id} />);
};

DrinkReviews.propTypes = {
  drinkId: PropTypes.string.isRequired,
};

export default DrinkReviews;
