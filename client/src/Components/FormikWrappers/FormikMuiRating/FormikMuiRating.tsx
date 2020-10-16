import React, { useMemo, useState } from 'react';
import { useField } from 'formik';
import { Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import styles from './FormikMuiRating.module.scss';

type Props = {
  className?: string;
  classes?: {
    [key: string]: string;
  };
  label?: string;
  max?: number;
  maxValue?: number;
  size?: 'medium' | 'small' | 'large' | undefined;
  name: string;
};

const FormikMuiRating: React.FC<Props> = ({
  className = '',
  classes = {},
  label = '',
  max = 5,
  maxValue = 5,
  size,
  name,
}: Props) => {
  const [, meta, helpers] = useField(name);

  const [hoverValue, setHoverValue] = useState(-1);
  const scaleFactor = useMemo(() => maxValue / max, [maxValue, max]);
  const scaledValue = useMemo(() => meta.value / scaleFactor, [scaleFactor, meta.value]);

  const handleChange = (v: number | null) => {
    if (!meta.touched) helpers.setTouched(true);
    if (v === null) return;
    helpers.setValue(v * scaleFactor);
    setHoverValue(v);
  };

  const getLabelVal = () => {
    return hoverValue !== -1 ? hoverValue : scaledValue;
  };

  return (
    <div className={clsx(styles.Root, classes.root, className)}>
      {label ? (
        <div className={clsx(styles.LabelRow, classes.label)}>
          <Typography variant="subtitle1">{label}</Typography>
          <Typography variant="button">{getLabelVal()}</Typography>
        </div>
      ) : null}
      <Rating
        className={clsx(classes.rating)}
        precision={0.5}
        name="foo"
        value={scaledValue}
        max={max}
        size={size}
        onChange={(e, v) => handleChange(v)}
        onChangeActive={(e, newHoverValue) => setHoverValue(newHoverValue)}
      />
      {meta.error && meta.touched ? (
        <Typography color="error" variant="caption">
          {JSON.stringify(meta.error)}
        </Typography>
      ) : null}
    </div>
  );
};

export default FormikMuiRating;
