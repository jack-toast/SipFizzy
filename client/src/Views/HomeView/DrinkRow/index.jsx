import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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

import { useHistory } from 'react-router-dom';
import { LocalBar } from '@material-ui/icons';
import styles from './styles.module.scss';
import DrinkReviews from '../../../Components/DrinkReviews';
import FadeProgressBar from '../../../Components/FadeProgressBar';
import { selectReviewsLoadingForDrink } from '../../../Redux/selectors/reviewsSelectors';

const flavorToColorMap = {
  grapefruit: '#f0bda6',
};

const DrinkRow = ({ drinkId }) => {
  const history = useHistory();
  const drink = useSelector((state) => state.drinks.drinks[drinkId]);
  const reviewsLoading = useSelector((state) =>
    selectReviewsLoadingForDrink(state, drinkId)
  );

  const avatarStyle = useMemo(() => {
    const pretendFlavor = ['grapefruit'];
    return {
      background: `linear-gradient(6.9deg, #ffdcce, #eea195)`,
    };
  }, [JSON.stringify(drink.flavors)]);

  const [showDeets, setShowDeets] = useState(
    drinkId === '5f7e659156a1ab3880e488a5'
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
    history.push(`/drinks/${drinkId}`);
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

        <DrinkReviews drinkId={drinkId} />
      </Collapse>
    </>
  );
};

DrinkRow.propTypes = {
  drinkId: PropTypes.string.isRequired,
};

export default DrinkRow;