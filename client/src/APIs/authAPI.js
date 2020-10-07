import kyReceiveKey from './kyReceiveKey';
import kyUseKey from './kyUseKey';

const baseURL = process.env.REACT_APP_API_URL;

export const getCurrentUserAPI = async () => {
  const res = await kyUseKey(`${baseURL}/user`);
  if (res.status !== 200) {
    throw new Error(res.message || 'unknown auth error');
  }
  const body = await res.json();
  return body;
};

export const loginUserAPI = async ({ email, password }) => {
  const res = await kyReceiveKey
    .post(`${baseURL}/login`, { json: { email, password } })
    .json();
  return res;
};

export const signupUserAPI = async ({ username, email, password }) => {
  const res = await kyReceiveKey
    .post(`${baseURL}/signup`, {
      json: { username, email, password },
      throwHttpErrors: false,
    })
    .json();
  return res;
};
