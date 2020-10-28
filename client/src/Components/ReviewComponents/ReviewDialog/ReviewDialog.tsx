import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { get, has } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { NewReview } from '../../../MyTypes/review';
import { selectDrinks } from '../../../Redux/selectors/drinksSelectors';
import {
  selectReviewDialogDrinkId,
  selectReviewDialogReviewId,
} from '../../../Redux/selectors/reviewDialogSelectors';
import {
  closeReviewDialog,
  createReview,
  updateReview,
} from '../../../Redux/slices/reviewDialogSlice';
import { RootState, useTypedSelector } from '../../../Redux/store';
import ReviewForm from '../ReviewForm/ReviewForm';
import styles from './ReviewDialog.module.scss';

const selectDrinkForDialog = createSelector(
  selectReviewDialogDrinkId,
  selectDrinks,
  (drinkId, drinks) => {
    if (has(drinks, drinkId)) return drinks[drinkId];
    return {};
  },
);

const selectExistingReview = createSelector(
  selectReviewDialogReviewId,
  (state: RootState) => state.reviews.reviews,
  (reviewId, reviews) => {
    return get(reviews, reviewId, null);
  },
);

const ReviewDialog: React.FC = () => {
  const dispatch = useDispatch();
  const { dialogOpen, reviewId } = useTypedSelector((state) => state.reviewDialog);
  const existingReview = useTypedSelector(selectExistingReview);
  const selectedDrink = useTypedSelector(selectDrinkForDialog);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (dialogOpen) setShowSuccessMessage(false);
    return undefined;
  }, [dialogOpen]);

  const handleSubmitReview = async (reviewArgs: NewReview) => {
    const submissionResult = reviewId
      ? await dispatch(updateReview(reviewArgs))
      : await dispatch(createReview(reviewArgs));

    console.log('submissionResult', submissionResult);
    if (get(submissionResult, 'type', '').includes('fulfilled')) {
      setShowSuccessMessage(true);
    }
    return submissionResult;
  };

  const handleCloseDialog = () => {
    dispatch(closeReviewDialog());
  };

  const getTitle = () => {
    if (reviewId) return `Update Sip - ${get(selectedDrink, 'name')}`;
    return `New Sip - ${get(selectedDrink, 'name') || 'unknown (tell jack)'}`;
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
          <ReviewForm handleSubmitForm={handleSubmitReview} existingValues={existingReview} />
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
