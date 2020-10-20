import ky from 'ky';

const baseURL = process.env.REACT_APP_API_URL;

export const getUserById = async (userId: string): Promise<any> => {
  if (!userId) throw new Error('invalid user id');
  const res = await ky(`${baseURL}/users/${userId}`).json();
  console.log('getUserById res', res);
  return res;
};

export const getUserReviews = async (userId: string): Promise<any> => {
  if (!userId) throw new Error('invalid user id');
  const res = await ky(`${baseURL}/users/${userId}/reviews`).json();
  console.log('get user reviews: res', res);
  return res;
};
