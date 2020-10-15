import { isString } from 'lodash';

import ky from 'ky';

const AUTH_TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY;

const kyUseKey = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        if (!AUTH_TOKEN_KEY) return;
        const token = localStorage.getItem(AUTH_TOKEN_KEY) || '';
        if (!!token && isString(token)) request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});

export default kyUseKey;
