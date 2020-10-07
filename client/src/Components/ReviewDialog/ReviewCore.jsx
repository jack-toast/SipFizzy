import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import fakeDrink from './fakeDrink';

import styles from './styles.module.scss';
import ReviewForm from '../ReviewForm';

const ReviewCore = ({ drinkId, open }) => {
  const drinkFromRedux = useSelector((state) => state.drinks.drinks[drinkId]);
  const [drink, setDrink] = useState({ ...fakeDrink });

  useEffect(() => {
    if (!open) return undefined;
    if (!drinkFromRedux) return undefined;
    setDrink({ ...drinkFromRedux });
    return () => {};
  }, [open, drinkFromRedux]);

  useEffect(() => {
    console.log('safeDrink', drink);
    return () => {};
  }, [drink]);

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
    console.log('vals', vals);
    console.log('other', other);
  };

  if (!drink) {
    return (
      <>
        <DialogTitle>Sorry, someone (jack) messed up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Someone (Jack), fucked up the API, so that drink couldn&apos;t be
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
};

export default ReviewCore;
