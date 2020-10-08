import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Collapse,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { GrTest } from 'react-icons/gr';

import { useHistory } from 'react-router-dom';
import { LocalBar } from '@material-ui/icons';
import styles from './styles.module.scss';
import useHover from '../../../Hooks/useHover';
import { fetchReviews } from '../../../Redux/slices/reviews';
import DrinkReviews from '../../../Components/DrinkReviews';

const DrinkRow = ({ drinkId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const drink = useSelector((state) => state.drinks.drinks[drinkId]);
  const [hoverRef, isHovered] = useHover();
  const [showDeets, setShowDeets] = useState(false);
  const { name, score, numRatings } = drink;

  useEffect(() => {
    if (!showDeets) return undefined;
    (async () => {
      const resso = await dispatch(fetchReviews({ drinkId }));
      console.log('resso', resso);
    })();
    return () => {};
  }, [showDeets, JSON.stringify(drink?.reviews)]);

  const handleClickRow = () => {
    setShowDeets((c) => !c);
  };

  const handleClickAddReview = (e) => {
    e.stopPropagation();
    history.push(`/drinks/${drinkId}`);
  };

  // Use a linear background gradient for the drink logo depending on the flavors!
  // Will allow you to load the images in the background
  // or just load the images when expanding.

  if (!drink) return null;
  return (
    <Paper
      key={`drink-row-${drinkId}`}
      className={styles.Root}
      onClick={handleClickRow}
      elevation={isHovered ? 3 : 1}
      ref={hoverRef}
    >
      <div className={styles.Summary}>
        <Avatar>
          <LocalBar />
        </Avatar>
        <div className={styles.DescriptionContainer}>
          <Typography variant="h6">{name}</Typography>
          <div className={styles.Subtitle}>
            <div className={styles.NumRatingsContainer}>
              <Typography>{`${numRatings || 0}`}</Typography>
              <GrTest />
            </div>
            {score && (
              <Typography className={styles.OverallScore}>
                {`${score.toFixed(0)}/69`}
              </Typography>
            )}
            <Tooltip title="Review Drink">
              <Button
                color="primary"
                style={{ marginLeft: 'auto' }}
                onClick={handleClickAddReview}
              >
                Sip it!
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <Collapse in={showDeets} mountOnEnter unmountOnExit>
        <div className={styles.ExpandedContent}>
          {/* render drink stats */}
          <DrinkReviews drinkId={drinkId} />
        </div>
      </Collapse>
    </Paper>
  );
};

DrinkRow.propTypes = {
  drinkId: PropTypes.string.isRequired,
};

export default DrinkRow;
