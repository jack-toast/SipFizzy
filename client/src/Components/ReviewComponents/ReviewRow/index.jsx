import React, { useState } from 'react';
import { ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import { Collapse, Paper, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import styles from './styles.module.scss';
import MyPropTypes from '../../../MyPropTypes';
import ExpandButton from '../../Shared/ExpandButton';

const ReviewRow = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
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

  const renderDate = () => {
    // eslint-disable-next-line new-cap
    const date = new DateTime.fromISO(createdAt);
    return (
      <Typography variant="body2">
        {date.toLocaleString(DateTime.DATE_MED)}
      </Typography>
    );
  };

  return (
    <Paper className={styles.Root}>
      <div className={styles.Header}>
        <div className={styles.Votes}>
          <ThumbUpRounded />
          <ThumbDownRounded />
        </div>
        <div className={styles.TitleAndSubtitle}>
          <Typography>{title}</Typography>
          <div className={styles.Subtitle}>
            {renderUsername()}
            {renderDate()}
            {/* <Typography>{createdAt}</Typography> */}
          </div>
        </div>
        <ExpandButton
          onClick={() => setExpanded((c) => !c)}
          expanded={expanded}
        />
      </div>
      <Collapse in={expanded}>
        <Typography className={styles.Description}>{description}</Typography>
      </Collapse>
    </Paper>
  );
};

ReviewRow.propTypes = {
  review: MyPropTypes.review.isRequired,
};

export default ReviewRow;
