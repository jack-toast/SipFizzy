import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DialogContent, DialogTitle, TextField } from '@material-ui/core';
import fakeDrink from './fakeDrink';

import styles from './styles.module.scss';

const ReviewCore = ({ drinkId, open }) => {
  const drinkFromRedux = useSelector((state) => state.drinks.drinks[drinkId]);
  const [safeDrink, setSafeDrink] = useState({ ...fakeDrink });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    if (!drinkFromRedux) return undefined;
    setSafeDrink({ ...drinkFromRedux });
    return () => {};
  }, [open, drinkFromRedux]);

  useEffect(() => {
    console.log('safeDrink', safeDrink);
    return () => {};
  }, [safeDrink]);

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

  return (
    <>
      <DialogTitle>{`Review - ${safeDrink.name}`}</DialogTitle>
      <DialogContent className={styles.DialogContent}>
        <TextField
          label="One-liner"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Gimme them deets"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
      </DialogContent>
      <div>
        <pre>{JSON.stringify(safeDrink, null, 2)}</pre>
      </div>
    </>
  );
};

ReviewCore.propTypes = {
  drinkId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ReviewCore;
