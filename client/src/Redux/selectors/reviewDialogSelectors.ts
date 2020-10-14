import { RootState } from '../store';

const selectReviewDialogDrinkId = (state: RootState): string | '' => state.reviewDialog.drinkId;

const selectReviewDialogReviewId = (state: RootState): string | '' => state.reviewDialog.reviewId;

export { selectReviewDialogDrinkId, selectReviewDialogReviewId };
