import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { CurrentUser } from '../../../MyTypes/user';

type AccountDetailsProps = {
  user: CurrentUser;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ user }: AccountDetailsProps) => {
  const [bio, setBio] = useState(user.bio);
  return (
    <Container maxWidth="sm">
      <Typography style={{ marginTop: '1.5rem' }} variant="h3" gutterBottom>
        Account Settings
      </Typography>
      <Typography>{user.username}</Typography>
      {/* <div>render image</div> */}
      <div>render bio</div>
    </Container>
  );
};

export default AccountDetails;
