import React, { useState } from 'react';
import { DeleteRounded, EditRounded, ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import { Collapse, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import styles from './ReviewRow.module.scss';
import ExpandButton from '../../Shared/ExpandButton';
import { openReviewEditorDialog } from '../../../Redux/slices/reviewDialogSlice';
import { useTypedSelector } from '../../../Redux/store';
import { Review } from '../../../MyTypes/review';
import { selectCurrentUser } from '../../../Redux/selectors/authSelectors';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog';
import { deleteReviewAPI } from '../../../APIs/reviewsAPI';
import { deleteReview } from '../../../Redux/slices/reviews';

export type Props = {
  review: Review;
};

const ReviewRow: React.FC<Props> = ({ review }: Props) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const currentUser = useTypedSelector(selectCurrentUser);
  const { username, title, createdAt, description, userId, id, drinkId } = review;

  const handleClickEditReview = () => {
    dispatch(
      openReviewEditorDialog({
        drinkId: drinkId,
        reviewId: id,
      }),
    );
  };

  const handleDeleteReview = async () => {
    console.log(`deleting review with id: ${review.id}`);
    const resp = await deleteReviewAPI(review.id);
    console.log('resp', resp);
    dispatch(deleteReview(review.id));
    setDeleteDialogOpen(false);
  };

  const renderUsername = () => {
    if (!username) return null;
    return (
      <NavLink
        to={`/user/${userId}`}
        className={styles.UserLink}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography color="textSecondary">{`@${username}`}</Typography>
      </NavLink>
    );
  };

  const renderEditIcons = () => {
    if (!currentUser) return null;
    if (userId !== currentUser._id) return null;
    return (
      <div className={styles.EditIcons}>
        <Tooltip title="Edit" placement="top">
          <IconButton size="small" onClick={handleClickEditReview}>
            <EditRounded fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <IconButton size="small" onClick={() => setDeleteDialogOpen(true)}>
            <DeleteRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <Paper className={styles.Root}>
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Review?"
        description="Are you sure you want to delete this review?"
        onConfirm={handleDeleteReview}
        onCancel={() => setDeleteDialogOpen(false)}
      />
      <div className={styles.Header}>
        {/* Do votes another time */}
        {/* <div className={styles.Votes}>
          <ThumbUpRounded />
          <ThumbDownRounded />
        </div> */}
        <div className={styles.TitleAndSubtitle}>
          <div className={styles.Title}>
            <Typography>{title}</Typography>
            {renderEditIcons()}
          </div>
          <div className={styles.Subtitle}>
            {renderUsername()}
            <Typography variant="body2">
              {DateTime.fromISO(`${createdAt}`).toLocaleString(DateTime.DATE_MED)}
            </Typography>
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
