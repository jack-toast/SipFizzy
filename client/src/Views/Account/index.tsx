import { CircularProgress, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/slices/auth';
import { useTypedSelector } from '../../Redux/store';
import AccountDetails from './AccountDetails';
import LoginForm from './LoginForm/index';

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useTypedSelector((state) => state.auth);

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
    return undefined;
  }, [dispatch]);

  if (loading !== 'idle') {
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
