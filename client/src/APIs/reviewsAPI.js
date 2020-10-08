import ky from 'ky';
import kyUseKey from './kyUseKey';

const baseURL = process.env.REACT_APP_API_URL;

// JY TODO - look at github rest api. See what params they offer
// owner, state, sort, direction, per_page, page, etc...
export const getReviews = async ({
  // reviewIds,
  // user,
  drinkId,
  // You should use the reviewIds from a drink object, because it requires one less scan.
  // That said, it would be nice to have a way to force a scan / refresh of the reviews...
  // ...associated with a drink. Like maybe do a hourly or daily fallback to make sure...
  // ... everything is set correctly.
  // numPerPage,
  // page,
  // direction,
  // sort,
}) => {
  const res = await ky(`${baseURL}/reviews`, {
    searchParams: {
      ...(drinkId && { drinkId }),
    },
  }).json();
  return res;
};

export const getReviewById = async (reviewId) => {
  const res = await ky(`${baseURL}/reviews/${reviewId}`).json();
  console.log('getReviewById res', res);
  return res;
};

export const createReviewAPI = async ({
  title,
  description,
  score,
  qualities,
  drinkId,
}) => {
  const res = await kyUseKey
    .post(`${baseURL}/reviews`, {
      json: { title, description, score, qualities, drinkId },
      throwHttpErrors: false,
    })
    .json();
  return res;
};
