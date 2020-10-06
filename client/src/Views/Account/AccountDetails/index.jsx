import { Container, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const arrPickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const possibleSubtitles = [
  'What are we drinking today?',
  'Fucking hell you look like shit!',
  'Go sip yourself',
];

const AccountDetails = () => {
  const {
    currentUser: { reviews, username },
  } = useSelector((state) => state.auth);

  const subtitle = useMemo(() => {
    return arrPickRandom(possibleSubtitles);
  }, []);

  const renderReviewSummary = (review) => {
    return <div>{review.description}</div>;
  };

  return (
    <Container maxWidth="md">
      <Typography style={{ marginTop: '1.5rem' }} variant="h3" gutterBottom>
        {`Hey ${username},`}
      </Typography>
      <Typography variant="caption" gutterBottom>
        {subtitle}
      </Typography>

      <Typography style={{ marginTop: '2rem' }} variant="h3">
        Your Reviews
      </Typography>
      {!reviews.length && (
        <Typography variant="caption">
          jk, you don&apos;t have any... Nerd
        </Typography>
      )}
      {reviews.map((review) => renderReviewSummary(review))}
    </Container>
  );
};

export default AccountDetails;
