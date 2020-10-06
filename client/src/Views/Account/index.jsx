import { CircularProgress, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import AccountDetails from './AccountDetails';
import LoginForm from './LoginForm/index';

const Account = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.auth);

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
  }, [dispatch]);

  if ((loading !== 'idle' && !currentUser) || isEmpty(currentUser)) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
        <Typography>loading...</Typography>
      </div>
    );
  }

  if (!currentUser || isEmpty(currentUser)) {
    return <LoginForm />;
  }

  return <AccountDetails />;
};

export default Account;
