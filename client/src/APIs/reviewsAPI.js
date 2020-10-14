/* eslint-disable no-unreachable */
import ky from 'ky';
import { get } from 'lodash';
import kyUseKey from './kyUseKey';

const baseURL = process.env.REACT_APP_API_URL;

// JY TODO - look at github rest api. See what params they offer
// owner, state, sort, direction, per_page, page, etc...
export const getReviews = async ({ drinkId }) => {
  const res = await ky(`${baseURL}/reviews`, {
    searchParams: {
      ...(drinkId && { drinkId }),
    },
  }).json();
  return res;
};

export const getReviewById = async (reviewId) => {
  const res = await ky(`${baseURL}/reviews/${reviewId}`).json();
  return res;
};

export const deleteFakeReviewsAPI = async () => {
  const res = await kyUseKey.delete(`${baseURL}/reviews/deleteFakes`).json();
  return res;
};

export const createReviewAPI = async (reviewArgs) => {
  if (!reviewArgs.username) throw new Error('You must be logged in to add a review');
  const res = await kyUseKey
    .post(`${baseURL}/reviews`, {
      json: { ...reviewArgs },
      throwHttpErrors: false,
    })
    .json();
  if (!get(res, 'success')) {
    throw new Error(res.message || 'Unknown Error Occurred');
  }
  return res;
};
