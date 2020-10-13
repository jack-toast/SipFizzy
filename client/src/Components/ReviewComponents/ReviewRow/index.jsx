import React, { useState } from 'react';
import {
  EditRounded,
  ThumbDownRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import { Collapse, Paper, Tooltip, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import MyPropTypes from '../../../MyPropTypes';
import ExpandButton from '../../Shared/ExpandButton';
import { openReviewEditorDialog } from '../../../Redux/slices/reviewDialog';

const ReviewRow = ({ review }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { username, title, createdAt, description, userId } = review;

  const handleClickEditReview = () => {
    console.log('open review editor');
    dispatch(
      openReviewEditorDialog({
        drinkId: review.drinkId,
        reviewId: review.id,
      })
    );
  };

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

  const renderEditIcon = () => {
    // eslint-disable-next-line no-underscore-dangle
    if (userId !== currentUser._id) return null;
    return (
      <Tooltip title="edit">
        <div
          role="button"
          tabIndex={0}
          onClick={handleClickEditReview}
          onKeyPress={({ key }) => {
            if (key === 'Enter') handleClickEditReview();
          }}
        >
          <EditRounded />
        </div>
      </Tooltip>
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
          <div className={styles.Title}>
            <Typography>{title}</Typography>
            {renderEditIcon()}
          </div>
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
