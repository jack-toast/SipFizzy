import React from 'react';
import { Button, Container, Divider, Typography } from '@material-ui/core';
import { deleteFakeReviewsAPI } from '../../APIs/reviewsAPI';
import { syncDrinkScoresAPI } from '../../APIs/drinksAPI';
import AccessControl from '../../Components/AccessControl';

const AdminView: React.FC = () => {
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
    <AccessControl>
      <Container maxWidth="sm">
        <Typography variant="h4">Admin Stuff</Typography>
        <Divider />
        <Button color="secondary" variant="outlined" onClick={deleteFakeReviews}>
          Delete fake reviews
        </Button>
        <Button onClick={syncDrinkScores} color="secondary" variant="outlined">
          Re-sync Drink Score
        </Button>
      </Container>
    </AccessControl>
  );
};

export default AdminView;
