import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import styles from './styles.module.scss';
import ReviewForm from '../ReviewForm';
import { createReviewAPI } from '../../APIs/reviewsAPI';

const ReviewCore = ({ drinkId, open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const drinkFromRedux = useSelector((state) => state.drinks.drinks[drinkId]);
  const [drink, setDrink] = useState({});

  useEffect(() => {
    if (!open) return undefined;
    if (!drinkFromRedux) return undefined;
    setDrink({ ...drinkFromRedux });
    return () => {};
  }, [open, drinkFromRedux]);

  /**
   * JY TODO
   * Add sliders for ratings or use the MUI ratings components
   * This component should be re-usable:
   * - Creating a review (authed)
   * - Modifying an existing review (authed)
   *
   * - Viewing someone elses review shouldn't require the modal.
   * - That should happen more in-line.
   *
   * - That's where we could use some better data-visualization.
   * - Radar Graph - https://nivo.rocks/radar/
   * - Maybe a simple bar chart?
   */

  const handleSubmitReview = async (vals, other) => {
    try {
      await createReviewAPI({ ...vals, drinkId });
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
      <DialogTitle>{`Sippin - ${drink.name}`}</DialogTitle>
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
