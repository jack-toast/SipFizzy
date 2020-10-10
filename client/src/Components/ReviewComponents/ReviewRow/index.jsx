import React, { useState } from 'react';
import { ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import MyPropTypes from '../../../MyPropTypes';

const ReviewRow = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClickRow = () => setExpanded((c) => !c);
  const { username, title, createdAt, description } = review;

  const renderUsername = () => {
    if (!username) return null;
    return (
      <NavLink
        to="/"
        className={styles.UserLink}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography color="textSecondary">{`@${username}`}</Typography>
      </NavLink>
    );
  };

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
          <Typography>{title}</Typography>
          <div className={styles.Subtitle}>
            {renderUsername()}
            <Typography>{createdAt}</Typography>
          </div>
        </div>
      </div>
      <Collapse in={expanded}>
        <Typography>{description}</Typography>
      </Collapse>
    </Paper>
  );
};

ReviewRow.propTypes = {
  review: MyPropTypes.review.isRequired,
};

export default ReviewRow;
