import { get, isString } from 'lodash';

const { default: ky } = require('ky');

const baseURL = process.env.REACT_APP_API_URL;

const AUTH_TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY;

const kyUseKey = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY) || '';
        console.log('token', token);
        if (!!token && isString(token))
          request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});

const kyReceiveKey = ky.extend({
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const { accessToken } = await response.json();
        console.log('accessToken', accessToken);
        if (accessToken) {
          console.log('we did it');
          localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
        }
      },
    ],
  },
});

export const getCurrentUserAPI = async () => {
  const res = await kyUseKey(`${baseURL}/user`);
  if (res.status !== 200) {
    console.log('/user res', res);
    throw new Error(res.message || 'unknown auth error');
  }
  const body = await res.json();
  return body;
};

export const loginUserAPI = async ({ email, password }) => {
  const res = await kyReceiveKey
    .post(`${baseURL}/login`, { json: { email, password } })
    .json();
  console.log('/login res', res);
  return res;
};

export const signupUserAPI = async ({ username, email, password }) => {
  const res = await kyReceiveKey
    .post(`${baseURL}/signup`, {
      json: { username, email, password },
      throwHttpErrors: false,
    })
    .json();
  console.log('/signup response:', res);
  return res;
};
