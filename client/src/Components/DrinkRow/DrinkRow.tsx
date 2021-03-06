import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Chip, Collapse, Paper, Tooltip, Typography } from '@material-ui/core';
import { GrTest } from 'react-icons/gr';

import { useTypedSelector } from '../../Redux/store';
import { LocalBar } from '@material-ui/icons';
import styles from './DrinkRow.module.scss';
import DrinkReviews from '../DrinkReviews/DrinkReviews';
import FadeProgressBar from '../FadeProgressBar/FadeProgressBar';
import DrinkStats from '../DrinkStats/DrinkStats';
import { openReviewDialog } from '../../Redux/slices/reviewDialogSlice';
import { has } from 'lodash';
import { selectDrinks } from '../../Redux/selectors/drinksSelectors';

type Props = { drinkId: string };

const DrinkRow: React.FC<Props> = ({ drinkId }: Props) => {
  const dispatch = useDispatch();
  const drinks = useTypedSelector(selectDrinks);
  const drink = useMemo(() => drinks[drinkId], [drinks, drinkId]);
  const activeDrinkMap = useTypedSelector((state) => state.reviews.activeDrinkMap);

  const reviewsLoading = useMemo(() => has(activeDrinkMap, drinkId), [drinkId, activeDrinkMap]);

  const avatarStyle = { background: `linear-gradient(6.9deg, #ffdcce, #eea195)` };

  const [showDeets, setShowDeets] = useState(drinkId === '5f7ff7418e80e037f59fbe88');
  const { name = 'delete me please', score = -0.4, numRatings = -1, flavors = [] } = drink;

  const handleClickRow = () => {
    setShowDeets((c) => !c);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleClickRow();
  };

  const handleClickAddReview = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(openReviewDialog(drinkId));
  };

  if (!drink) return null;
  return (
    <>
      <Paper
        onClick={handleClickRow}
        role="button"
        tabIndex={0}
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
            <Typography variant="h6" color="textPrimary">
              {name}
            </Typography>
            <div className={styles.Subtitle}>
              <div className={styles.NumRatingsContainer}>
                <Typography>{`${numRatings || 0}`}</Typography>
                <GrTest />
              </div>
              {score && (
                <Typography className={styles.OverallScore}>{`${score.toFixed(0)}/100`}</Typography>
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
        <FadeProgressBar active={reviewsLoading} />
        <DrinkStats drink={drink} />
        <DrinkReviews drinkId={drinkId} />
      </Collapse>
    </>
  );
};

export default DrinkRow;
