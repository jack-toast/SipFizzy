import { Button, Container, Divider, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { deleteFakeReviewsAPI } from '../../../APIs/reviewsAPI';
import { syncDrinkScoresAPI } from '../../../APIs/drinksAPI';
import AccessControl from '../../../Components/AccessControl';

import styles from './styles.module.scss';
import { useTypedSelector } from '../../../Redux/store';

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
  } = useTypedSelector((state) => state.auth);

  const subtitle = useMemo(() => {
    return arrPickRandom(possibleSubtitles);
  }, []);

  const deleteFakeReviews = async () => {
    try {
      const resp = await deleteFakeReviewsAPI();
      console.log('resp', resp);
    } catch (err) {
      console.log('err', err);
    }
  };

  const syncDrinkScores = async () => {
    try {
      const resp = await syncDrinkScoresAPI();
      console.log('resp', resp);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography style={{ marginTop: '1.5rem' }} variant="h3" gutterBottom>
        {`Hey ${username},`}
      </Typography>
      <Typography variant="caption" gutterBottom>
        {subtitle}
      </Typography>

      <AccessControl>
        <div className={styles.AdminControlsContainer}>
          <Typography variant="h4">Admin Stuff</Typography>
          <Divider className={styles.AdminDivider} />
          <Button color="secondary" variant="outlined" onClick={deleteFakeReviews}>
            Delete fake reviews
          </Button>

          <Button onClick={syncDrinkScores} color="secondary" variant="outlined">
            Re-sync Drink Score
          </Button>
        </div>
      </AccessControl>

      {/* <Typography style={{ marginTop: '2rem' }} variant="h3">
        Your Reviews
      </Typography>
      {!reviews.length && (
        <Typography variant="caption">
          jk, you don&apos;t have any... Nerd
        </Typography>
      )}
      {reviews.map((review) => renderReviewSummary(review))} */}
    </Container>
  );
};

export default AccountDetails;
