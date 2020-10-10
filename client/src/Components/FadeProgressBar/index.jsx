/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.scss';

const FadeProgressBar = ({ active, style }) => {
  return (
    <div
      style={{ ...style }}
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
  style: PropTypes.object,
};

FadeProgressBar.defaultProps = {
  style: {},
};

export default FadeProgressBar;
