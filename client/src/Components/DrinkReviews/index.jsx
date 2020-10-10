import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { has } from 'lodash';
import { Typography } from '@material-ui/core';
import { makeSelectReviewsForDrink } from '../../Redux/selectors/reviewsSelectors';
import { fetchReviews } from '../../Redux/slices/reviews';
import ReviewRow from '../ReviewComponents/ReviewRow';

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
  // return reviews.map((review) => <ReviewRow review={review} key={review.id} />);
  return (
    <>
      {reviews.length ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="overline">reviews</Typography>
        </div>
      ) : null}
      {reviews.map((review) => (
        <ReviewRow review={review} key={review.id} />
      ))}
    </>
  );
};

DrinkReviews.propTypes = {
  drinkId: PropTypes.string.isRequired,
};

export default DrinkReviews;
