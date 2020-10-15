import ky from 'ky';

const AUTH_TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY;

const kyReceiveKey = ky.extend({
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const { accessToken } = await response.json();
        if (accessToken && AUTH_TOKEN_KEY) {
          localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
        }
      },
    ],
  },
});

export default kyReceiveKey;
