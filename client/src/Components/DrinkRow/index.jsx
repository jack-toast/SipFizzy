import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Chip,
  Collapse,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { GrTest } from 'react-icons/gr';

import { LocalBar } from '@material-ui/icons';
import styles from './styles.module.scss';
import DrinkReviews from '../DrinkReviews';
import FadeProgressBar from '../FadeProgressBar';
import { selectReviewsLoadingForDrink } from '../../Redux/selectors/reviewsSelectors';
import DrinkStats from '../DrinkStats';
import { openReviewDialog } from '../../Redux/slices/reviewDialog';

const DrinkRow = ({ drinkId }) => {
  const dispatch = useDispatch();
  const drink = useSelector((state) => state.drinks.drinks[drinkId]);
  const reviewsLoading = useSelector((state) =>
    selectReviewsLoadingForDrink(state, drinkId)
  );

  const avatarStyle = useMemo(() => {
    return {
      background: `linear-gradient(6.9deg, #ffdcce, #eea195)`,
    };
  }, [JSON.stringify(drink.flavors)]);

  const [showDeets, setShowDeets] = useState(
    false
    // drinkId === '5f7ff7418e80e037f59fbe88'
  );
  const {
    name = 'delete me please',
    score = -0.4,
    numRatings = -1,
    flavors = [],
  } = drink;

  const handleClickRow = () => {
    setShowDeets((c) => !c);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleClickRow();
  };

  const handleClickAddReview = (e) => {
    e.stopPropagation();
    dispatch(openReviewDialog(drinkId));
    // history.push(`/addReview/${drinkId}`);
  };

  // Use a linear background gradient for the drink logo depending on the flavors!
  // Will allow you to load the images in the background
  // or just load the images when expanding.

  if (!drink) return null;
  return (
    <>
      <Paper
        onClick={handleClickRow}
        role="button"
        tabIndex="0"
        elevation={showDeets ? 3 : 1}
        onKeyPress={handleKeyPress}
        key={`drink-row-${drinkId}`}
        className={styles.Root}
      >
        <div className={styles.Summary}>
          <Avatar style={{ ...avatarStyle }}>
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
                  {`${score.toFixed(0)}/100`}
                </Typography>
              )}
              {flavors.map((flavor) => (
                <Chip
                  key={`${drinkId}-flavor-chip-${flavor}`}
                  className={styles.Chip}
                  size="small"
                  label={flavor}
                />
              ))}
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
      </Paper>
      <Collapse in={showDeets} mountOnEnter unmountOnExit>
        {/* <div className={styles.ExpandedContent}> */}
        {/* render drink stats */}
        <FadeProgressBar active={reviewsLoading} />
        <DrinkStats drink={drink} />
        <DrinkReviews drinkId={drinkId} />
      </Collapse>
    </>
  );
};

DrinkRow.propTypes = {
  drinkId: PropTypes.string.isRequired,
};

export default DrinkRow;
