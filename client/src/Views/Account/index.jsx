import { Input } from '@material-ui/core';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import LoginForm from './LoginForm/index';

const Account = () => {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const requestCurrentUser = async () => {
      try {
        const resp = await dispatch(fetchCurrentUser());
        console.log('resp', resp);
      } catch (err) {
        console.log('err', err);
      }
    };
    requestCurrentUser();
    return () => {};
  }, []);

  return (
    <div>
      <div>{`loading: ${loading}`}</div>
      <div>{`error.message: ${error?.message}`}</div>
      <LoginForm />
    </div>
  );
};

export default Account;
