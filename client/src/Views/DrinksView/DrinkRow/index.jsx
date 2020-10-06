import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { GrTest } from 'react-icons/gr';

import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

const DrinkRow = ({ drinkId }) => {
  const history = useHistory();
  const drink = useSelector((state) => state.drinks.drinks[drinkId]);
  if (!drink) return null;

  const {
    name,
    ratings: { overall },
    numRatings,
  } = drink;

  // add an on-exit handler to the drink modal

  const handleClickRow = () => {
    history.push(`/drinks/${drinkId}`);
  };

  return (
    <Paper
      key={`drink-row-${drinkId}`}
      className={styles.Root}
      onClick={handleClickRow}
    >
      <div className={styles.DescriptionContainer}>
        <Typography variant="h6">{name}</Typography>
        <div className={styles.Subtitle}>
          {numRatings && (
            <div className={styles.NumRatingsContainer}>
              <Typography>{`${numRatings}`}</Typography>
              <GrTest />
            </div>
          )}
          {overall && (
            <Typography className={styles.OverallScore}>
              {`${(overall * 6.9).toFixed(1)}/6.9`}
            </Typography>
          )}
        </div>
      </div>
    </Paper>
  );
};

DrinkRow.propTypes = {
  drinkId: PropTypes.string.isRequired,
};

export default DrinkRow;
