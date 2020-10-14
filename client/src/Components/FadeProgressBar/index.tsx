import React from 'react';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  active: boolean;
  style?: React.CSSProperties;
};
const FadeProgressBar: React.FC<Props> = ({ active, style }: Props) => {
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

export default FadeProgressBar;
