import ky from 'ky';
import { NewReview, Review } from '../MyTypes/review';
import kyUseKey from './kyUseKey';

const baseURL = process.env.REACT_APP_API_URL;

// JY TODO - look at github rest api. See what params they offer
// owner, state, sort, direction, per_page, page, etc...
type GetReviewsArgs = {
  drinkId: string;
};
type GetReviewsResponse = {
  success: boolean;
  reviews: Review[];
};
export const getReviews = async ({ drinkId }: GetReviewsArgs): Promise<GetReviewsResponse> => {
  const res = await ky(`${baseURL}/reviews`, {
    searchParams: {
      ...(drinkId && { drinkId }),
    },
  }).json();
  return res as GetReviewsResponse;
};

export const getReviewById = async (reviewId: string) => {
  const res = await ky(`${baseURL}/reviews/${reviewId}`).json();
  return res;
};

export const deleteFakeReviewsAPI = async () => {
  const res = await kyUseKey.delete(`${baseURL}/reviews/deleteFakes`).json();
  return res;
};

type CreateReviewArgs = {
  username: string;
  drinkId: string;
};
type CreateReviewResponse = {
  success: boolean;
  message: string;
  id: string;
  review: Review;
};
// type CreateReviewArgs = Foo & NewReview;
export const createReviewAPI = async (reviewArgs: CreateReviewArgs & NewReview) => {
  if (!reviewArgs.username) throw new Error('You must be logged in to add a review');
  const res: CreateReviewResponse = await kyUseKey
    .post(`${baseURL}/reviews`, {
      json: { ...reviewArgs },
      throwHttpErrors: false,
    })
    .json();
  if (!res.success || !res.id) {
    throw new Error(res.message || 'Unknown Error Occurred');
  }
  return res;
};
