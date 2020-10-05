import { isString } from 'lodash';

const { default: ky } = require('ky');

const baseURL = process.env.REACT_APP_API_URL;

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

const authKy = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY) || '';
        console.log('token', token);
        if (!!token && isString(token))
          request.headers.set('Authorization', token);
      },
    ],
  },
});

export const getCurrentUserAPI = async () => {
  const res = await authKy(`${baseURL}/user`).json();
  console.log('/user res', res);
  if (res.status !== 200) {
    throw new Error(res.message || 'unknown auth error');
  }
  return res;
};

export const loginUserAPI = async (email, password) => {
  const res = await ky
    .post(`${baseURL}/login`, { json: { email, password } })
    .json();
  console.log('/login res', res);
  return res;
};
