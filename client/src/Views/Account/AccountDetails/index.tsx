import React from 'react';
import { Button, Container, Divider, Typography } from '@material-ui/core';
import { deleteFakeReviewsAPI } from '../../../APIs/reviewsAPI';
import { syncDrinkScoresAPI } from '../../../APIs/drinksAPI';
import AccessControl from '../../../Components/AccessControl';
import styles from './styles.module.scss';
import { useTypedSelector } from '../../../Redux/store';
import { selectCurrentUser } from '../../../Redux/selectors/authSelectors';
import { get } from 'lodash';

const AccountDetails: React.FC = () => {
  const currentUser = useTypedSelector(selectCurrentUser);

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
        {`Hey ${get(currentUser, 'username', 'Bob')},`}
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
    </Container>
  );
};

export default AccountDetails;
