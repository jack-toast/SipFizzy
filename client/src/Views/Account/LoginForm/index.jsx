/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import styles from './styles.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  /**
   * JY TODO
   * Implement signup
   * Implement sign in
   */

  return (
    <div className={styles.Root}>
      <Paper className={styles.Paper} elevation={3}>
        <Typography gutterBottom variant="h4">
          Sign In
        </Typography>
        <Divider />
        <TextField
          className={styles.Input}
          // placeholder="Email"
          value={email}
          type="email"
          label="Your e-mail"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          className={styles.Input}
          // placeholder="Password"
          value={password}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <div className={styles.ButtonContainer}>
          <Button variant="contained" color="primary">
            Sign in
          </Button>
          <Button variant="contained" color="secondary">
            sign up
          </Button>
        </div>
      </Paper>
    </div>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
