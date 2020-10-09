import React, { useState } from 'react';
import { ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import { Collapse, Paper, Typography } from '@material-ui/core';
import styles from './styles.module.scss';
import MyPropTypes from '../../MyPropTypes';

const ReviewRow = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClickRow = () => setExpanded((c) => !c);

  return (
    <Paper
      className={styles.Root}
      onClick={() => setExpanded((c) => !c)}
      tabIndex={0}
      onKeyDown={({ key }) => {
        if (key === 'Enter') handleClickRow();
      }}
    >
      <div className={styles.Header}>
        <div className={styles.Votes}>
          <ThumbUpRounded />
          <ThumbDownRounded />
        </div>
        <div className={styles.TitleAndSubtitle}>
          <Typography>{review.title}</Typography>
          <Typography>{review.createdAt}</Typography>
        </div>
      </div>
      <Collapse in={expanded}>
        <Typography>{review.description}</Typography>
      </Collapse>
    </Paper>
  );
};

ReviewRow.propTypes = {
  review: MyPropTypes.review.isRequired,
};

export default ReviewRow;
