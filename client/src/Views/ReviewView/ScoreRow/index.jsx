import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Typography } from '@material-ui/core';
import styles from './styles.module.scss';
import SCORING_CATEGORIES from '../scoringCategories';

const categoryDescriptions = {
  [SCORING_CATEGORIES.flavor]: 'Flavor',
  [SCORING_CATEGORIES.drinkability]: 'Drinkability',
  [SCORING_CATEGORIES.mouth]: 'Mouth Feel',
};

const ScoreRow = ({ score, category, handleChangeScore }) => {
  return (
    <div className={styles.Root} key={`score-category-${category}`}>
      <Typography variant="h6">
        {categoryDescriptions[category] || category}
      </Typography>
      <Slider
        value={score}
        min={0}
        max={1}
        step={0.01}
        onChange={(e, val) => handleChangeScore(category, val)}
      />
    </div>
  );
};

ScoreRow.propTypes = {
  score: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  handleChangeScore: PropTypes.func.isRequired,
};

export default ScoreRow;
