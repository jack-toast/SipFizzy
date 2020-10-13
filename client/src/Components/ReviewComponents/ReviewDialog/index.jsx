import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { closeReviewDialog, createReview } from '../../../Redux/slices/reviewDialog';
import { useTypedSelector } from '../../../Redux/store';
import ReviewForm from '../ReviewForm';
import styles from './styles.module.scss';

const selectDrinkForDialog = createSelector(
  (state) => state.reviewDialog.drinkId,
  (state) => state.drinks.drinks,
  (drinkId, drinks) => {
    return get(drinks, drinkId, {});
  },
);

const selectExistingReview = createSelector(
  (state) => state.reviewDialog.reviewId,
  (state) => state.reviews.reviews,
  (reviewId, reviews) => {
    return get(reviews, reviewId, null);
  },
);

const ReviewDialog = () => {
  const dispatch = useDispatch();
  const { dialogOpen } = useTypedSelector((state) => state.reviewDialog);
  const existingReview = useTypedSelector(selectExistingReview);
  const { name } = useTypedSelector(selectDrinkForDialog);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    console.log('existingReview', existingReview);
    return () => {};
  }, [existingReview]);

  useEffect(() => {
    if (dialogOpen) setShowSuccessMessage(false);
    return () => {};
  }, [dialogOpen]);

  const handleSubmitReviewThunk = async (reviewArgs) => {
    const submissionResult = await dispatch(createReview(reviewArgs));
    console.log('submissionResult', submissionResult);
    if (submissionResult.type.includes('fulfilled')) {
      setShowSuccessMessage(true);
    }
    return submissionResult;
  };

  const handleCloseDialog = () => {
    dispatch(closeReviewDialog());
  };

  const getTitle = () => {
    return `New Sip - ${name || 'unknown (tell jack)'}`;
  };

  return (
    <Dialog
      open={dialogOpen}
      maxWidth={showSuccessMessage ? 'xs' : 'sm'}
      fullWidth={!showSuccessMessage}
      onClose={handleCloseDialog}
    >
      <Collapse in={!showSuccessMessage} mountOnEnter unmountOnExit>
        <DialogTitle>{getTitle()}</DialogTitle>
        <DialogContent className={styles.DialogContent}>
          <ReviewForm
            handleSubmitForm={handleSubmitReviewThunk}
            existingValues={{ ...existingReview }}
          />
        </DialogContent>
      </Collapse>
      <Collapse in={showSuccessMessage} mountOnEnter unmountOnExit>
        <div className={styles.SuccessMessageContainer}>
          <Typography variant="h4">Thank you!</Typography>
          <Button color="primary" variant="contained" onClick={handleCloseDialog}>
            Get back out there tiger
          </Button>
          <Typography variant="caption">
            I mean, your opinions are wrong, but that&apos;s ok!
          </Typography>
        </div>
      </Collapse>
    </Dialog>
  );
};

export default ReviewDialog;
