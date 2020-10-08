import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.scss';

const FadeProgressBar = ({ active }) => {
  return (
    <div
      className={clsx(styles.ProgressContainer, {
        [styles.show]: active,
      })}
    >
      <LinearProgress />
    </div>
  );
};

FadeProgressBar.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default FadeProgressBar;
