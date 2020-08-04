import React, { useState, useMemo, useCallback } from 'react';

import { Container, Typography, Divider, Paper } from '@material-ui/core';
import styles from './styles.module.scss';
import ScoreRow from './ScoreRow';
import SCORING_CATEGORIES from './scoringCategories';

const ReviewView = () => {
  // const [score, setScore] = useState(0.5);
  const [scores, setScores] = useState({
    [SCORING_CATEGORIES.flavor]: 0.5,
    [SCORING_CATEGORIES.shotgun]: 0.5,
    [SCORING_CATEGORIES.mouth]: 0.5,
  });

  const handleChangeScore = useCallback((category, newScore) => {
    setScores((currScores) => ({ ...currScores, [category]: newScore }));
  }, []);

  const scoreSections = useMemo(() => {
    return Object.entries(scores).map(([category, score]) => (
      <ScoreRow
        key={`score-category-${category}`}
        score={score}
        category={category}
        handleChangeScore={handleChangeScore}
      />
    ));
  }, [scores, handleChangeScore]);

  return (
    <Container maxWidth="md">
      <div className={styles.DrinkReviewContainer}>
        <Paper
          className={styles.DrinkImage}
          style={{
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bodega_Bay_Hard_Seltzer.jpg/1024px-Bodega_Bay_Hard_Seltzer.jpg)`,
          }}
        />
        <div className={styles.ScoringControls}>
          <Typography variant="h5" gutterBottom>
            Bodega Bay Apple
          </Typography>
          <Divider />
          {scoreSections}
          {/* <Scores scores={scores} handleChangeScore={handleChangeScore} /> */}
        </div>
      </div>
    </Container>
  );
};

export default ReviewView;
