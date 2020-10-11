import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

import { Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import styles from './styles.module.scss';

/**
 * Wrapper to use Mui Lab's Rating component with Formik
 *
 * @param {String} label foo bar
 */
const FormikMuiRating = ({
  className,
  classes,
  label,
  max,
  maxValue,
  size,
  ...props
}) => {
  const [, meta, helpers] = useField(props);

  const [hoverValue, setHoverValue] = useState(-1);
  const scaleFactor = useMemo(() => maxValue / max, [maxValue, max]);
  const scaledValue = useMemo(() => meta.value / scaleFactor, [
    scaleFactor,
    meta.value,
  ]);

  const handleChange = (e, v) => {
    helpers.setValue(v * scaleFactor);
    setHoverValue(v);
    if (!meta.touched) helpers.setTouched(true);
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
        onChange={handleChange}
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

FormikMuiRating.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    rating: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
  }),
  className: PropTypes.string,
  /** Label for the input ("Score", "Stars") for display */
  label: PropTypes.string,
  /** How many stars (or other icons) to show. */
  max: PropTypes.number,
  /** What is the max value coming from the form. Used to scale the value we pass to the Rating component */
  maxValue: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

FormikMuiRating.defaultProps = {
  className: '',
  classes: {
    root: '',
    rating: '',
    error: '',
    label: '',
  },
  label: '',
  max: 5,
  maxValue: 5,
  size: 'medium',
  // precision: 0.5,
};

export default FormikMuiRating;
