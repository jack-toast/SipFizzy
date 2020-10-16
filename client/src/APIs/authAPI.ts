import kyReceiveKey from './kyReceiveKey';
import kyUseKey from './kyUseKey';

const baseURL = process.env.REACT_APP_API_URL;

export const getCurrentUserAPI = async (): Promise<any> => {
  const res = await kyUseKey(`${baseURL}/user`);
  if (res.status !== 200) {
    // throw new res.error();
    throw new Error('Couldnt auth current user. Probably need to sign in');
  }
  const body = await res.json();
  return body;
};

type LoginUserApiProps = {
  email: string;
  password: string;
};
export const loginUserAPI = async ({ email, password }: LoginUserApiProps): Promise<any> => {
  const res = await kyReceiveKey.post(`${baseURL}/login`, { json: { email, password } }).json();
  return res;
};

type SignUpProps = {
  username: string;
  email: string;
  password: string;
};
export const signupUserAPI = async ({ username, email, password }: SignUpProps): Promise<any> => {
  const res = await kyReceiveKey
    .post(`${baseURL}/signup`, {
      json: { username, email, password },
      throwHttpErrors: false,
    })
    .json();
  return res;
};
