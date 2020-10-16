import React, { useState } from 'react';
import { EditRounded, ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import { Collapse, Paper, Tooltip, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import styles from './ReviewRow.module.scss';
import ExpandButton from '../../Shared/ExpandButton';
import { openReviewEditorDialog } from '../../../Redux/slices/reviewDialogSlice';
import { useTypedSelector } from '../../../Redux/store';
import { Review } from '../../../MyTypes/review';
import { selectCurrentUser } from '../../../Redux/selectors/authSelectors';

type Props = {
  review: Review;
};
const ReviewRow: React.FC<Props> = ({ review }: Props) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const currentUser = useTypedSelector(selectCurrentUser);
  const { username, title, createdAt, description, userId } = review;

  const handleClickEditReview = () => {
    dispatch(
      openReviewEditorDialog({
        drinkId: review.drinkId,
        reviewId: review.id,
      }),
    );
  };

  const renderUsername = () => {
    if (!username) return null;
    return (
      <NavLink to="/" className={styles.UserLink} onClick={(e) => e.stopPropagation()}>
        <Typography color="textSecondary">{`@${username}`}</Typography>
      </NavLink>
    );
  };

  const renderDate = () => {
    const date = DateTime.fromISO(`${createdAt}`);
    return <Typography variant="body2">{date.toLocaleString(DateTime.DATE_MED)}</Typography>;
  };

  const renderEditIcon = () => {
    // eslint-disable-next-line no-underscore-dangle
    if (!currentUser) return null;
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
          </div>
        </div>
        <ExpandButton onClick={() => setExpanded((c) => !c)} expanded={expanded} />
      </div>
      <Collapse in={expanded}>
        <Typography className={styles.Description}>{description}</Typography>
      </Collapse>
    </Paper>
  );
};

export default ReviewRow;
