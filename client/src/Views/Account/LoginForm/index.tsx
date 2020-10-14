import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { has } from 'lodash';
import styles from './styles.module.scss';
import { loginUserAPI, signupUserAPI } from '../../../APIs/authAPI';

const LoginForm: React.FC = () => {
  const [existingUser, setExistingUser] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const attemptSignup = async () => {
    try {
      const resp = await signupUserAPI({
        username,
        email,
        password,
      });
      console.log('resp', resp);
      if (!resp.success) throw new Error(resp.message || 'Could not sign up');
    } catch (err) {
      console.log('err', err);
      const { message = '' } = err;
      setErrorMessage(message);
    }
  };

  const attemptSignin = async () => {
    try {
      const resp = await loginUserAPI({
        // username,
        email,
        password,
      });
      console.log('resp', resp);
      console.log('resp status', resp.status);
      if (has(resp, 'status') && !resp.ok) throw new Error(resp.message || 'Could not sign in');
    } catch (err) {
      console.log('err', err);
      const { message = '' } = err;
      setErrorMessage(message);
    }
  };

  const handleSignInOrUp = () => {
    if (existingUser) {
      attemptSignin();
      return;
    }
    attemptSignup();
  };

  return (
    <div className={styles.Root}>
      <Paper className={styles.Paper} elevation={3}>
        <Typography gutterBottom variant="h4">
          {existingUser ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Divider />

        <Collapse in={!existingUser} classes={{ wrapperInner: styles.CollapseInnerWrapper }}>
          <TextField
            className={styles.Input}
            value={username}
            label="Your Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Collapse>

        <TextField
          className={styles.Input}
          value={email}
          type="email"
          label="Your email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          className={styles.Input}
          value={password}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Collapse in={existingUser}>
          <FormControlLabel
            className={styles.Checkbox}
            control={
              <Checkbox
                checked={keepLoggedIn}
                color="primary"
                onChange={(_, checked) => setKeepLoggedIn(checked)}
              />
            }
            label="Keep me logged in"
          />
        </Collapse>
        <Collapse in={errorMessage.length > 0}>
          <div>
            <Typography color="error">{errorMessage}</Typography>
          </div>
        </Collapse>
        <Button variant="contained" color="primary" onClick={handleSignInOrUp}>
          {existingUser ? 'Sign in' : 'Sign up'}
        </Button>
        {!existingUser && (
          <div className={styles.CheckExistingContainer}>
            <Typography>Already have an account?</Typography>
            <Button onClick={() => setExistingUser(true)} color="secondary">
              Sign In
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default LoginForm;
