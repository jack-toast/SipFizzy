import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { filter } from 'lodash';
import { CircularProgress, Typography } from '@material-ui/core';

const DrinkReviews = ({ drinkId, shouldFetch }) => {
  const reviews = useSelector(
    (state) => filter(state.reviews.reviews, (r) => r.drinkId === drinkId),
    shallowEqual
  );
  const reviewsLoading = useSelector((state) => state.reviews.loading);
  useEffect(() => {
    console.log('reviews', reviews);
    return () => {};
  }, [reviews]);

  const renderLoading = () => {
    if (reviewsLoading === 'idle') return null;
    return (
      <div style={{ alignSelf: 'center' }}>
        <CircularProgress />
      </div>
    );
  };

  if (!reviews || !reviews.length) {
    return (
      <>
        {renderLoading()}
        <Typography>Brb, lemme get those for ya</Typography>
      </>
    );
  }

  return reviews.map((r) => {
    return (
      <>
        {renderLoading()}
        <div>
          <pre>{JSON.stringify(r, null, 2)}</pre>
        </div>
      </>
    );
  });
};

DrinkReviews.propTypes = {
  drinkId: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool,
};

DrinkReviews.defaultProps = {
  shouldFetch: false,
};

export default DrinkReviews;
