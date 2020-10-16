import React from 'react';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import styles from './FadeProgressBar.module.scss';

export type Props = {
  active: boolean;
};

const FadeProgressBar: React.FC<Props> = ({ active }: Props) => {
  return (
    <div
      className={clsx(styles.ProgressContainer, {
        [styles.show]: active,
      })}
      data-testid="progress-container"
    >
      <LinearProgress />
    </div>
  );
};

export default FadeProgressBar;
