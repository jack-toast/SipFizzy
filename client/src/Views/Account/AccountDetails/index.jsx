import React from 'react';
import { useSelector } from 'react-redux';

const AccountDetails = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
};

export default AccountDetails;
