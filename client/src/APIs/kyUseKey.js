import { isString } from 'lodash';

const { default: ky } = require('ky');

const AUTH_TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY;

const kyUseKey = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY) || '';
        if (!!token && isString(token))
          request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});

export default kyUseKey;