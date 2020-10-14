import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filter, has } from 'lodash';
import { Typography } from '@material-ui/core';
import { selectReviews } from '../../Redux/selectors/reviewsSelectors';
import { fetchReviews } from '../../Redux/slices/reviews';
import { useTypedSelector } from '../../Redux/store';
import ReviewRow from '../ReviewComponents/ReviewRow';

type Props = {
  drinkId: string;
};

const DrinkReviews: React.FC<Props> = ({ drinkId }) => {
  const dispatch = useDispatch();
  const allReviews = useSelector(selectReviews);
  const reviews = useMemo(() => {
    return filter(allReviews, (r) => r.drinkId === drinkId);
  }, [allReviews, drinkId]);
  // const selectReviewsForDrink = useMemo(makeSelectReviewsForDrink, []);
  // const reviews = useTypedSelector((state) => selectReviewsForDrink(state, drinkId));
  const activeDrinkMap = useTypedSelector((state) => state.reviews.activeDrinkMap);
  useEffect(() => {
    if (has(activeDrinkMap, 'drinkId')) return undefined;
    dispatch(fetchReviews({ drinkId }));
    return undefined;
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
