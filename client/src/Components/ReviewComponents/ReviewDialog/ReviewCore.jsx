import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { get, has } from 'lodash';
import styles from './styles.module.scss';
import ReviewForm from '../ReviewForm';
import { createReviewAPI } from '../../../APIs/reviewsAPI';

const ReviewCore = ({ drinkId, open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const drinkFromRedux = useSelector((state) => state.drinks.drinks[drinkId]);
  const username = useSelector((state) => state.auth.currentUser.username);
  const [drink, setDrink] = useState({});

  useEffect(() => {
    if (!open) return undefined;
    if (!drinkFromRedux) return undefined;
    setDrink({ ...drinkFromRedux });
    return () => {};
  }, [open, drinkFromRedux]);

  const handleSubmitReview = async (vals, other) => {
    if (!username) {
      enqueueSnackbar('You must be signed in to leave a review', {
        variant: 'error',
        autoHideDuration: 4000,
      });
      onClose();
      setTimeout(() => {
        history.push('/account');
      }, 2000);
      return;
    }
    try {
      const createReviewResp = await createReviewAPI({
        ...vals,
        drinkId,
        username,
      });
      if (has(createReviewResp, 'status') && createReviewResp.status !== 200) {
        console.log('createReviewResp', createReviewResp);
        throw new Error(createReviewResp.message || 'Couldnt create review');
      }
      enqueueSnackbar('Review Added', {
        variant: 'success',
        autoHideDuration: 1500,
      });
      onClose();
    } catch (err) {
      console.log('error encountered creating review', err);
      console.log('vals + other', { vals, other });

      enqueueSnackbar(err.message, {
        autoHideDuration: 3000,
        variant: 'error',
      });
      onClose();
    }
  };

  if (!drink) {
    return (
      <>
        <DialogTitle>Sorry, someone (jack) messed up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Someone (Jack), screwed up the API, so that drink couldn&apos;t be
            loaded. Don&apos;t worry, he will be drawn and quartered for this...
          </DialogContentText>
        </DialogContent>
      </>
    );
  }

  return (
    <>
      <DialogTitle>{`New Sip - ${drink.name}`}</DialogTitle>
      <DialogContent className={styles.DialogContent}>
        <ReviewForm handleSubmitForm={handleSubmitReview} />
      </DialogContent>
    </>
  );
};

ReviewCore.propTypes = {
  drinkId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewCore;
