import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Slider, Typography } from '@material-ui/core';
import { useField } from 'formik';

import styles from './styles.module.scss';
// JY TODO - contribute to the formit-material-ui repo
// add slider support

const FormikMuiSlider = ({ label, min, step, max, ...props }) => {
  // props MUST contain a 'name' value that maps to the formik value with the same name
  const [, meta, helpers] = useField(props);
  // This makes the slider snappy, but avoids potentially sluggish onChange calls
  const [internalValue, setInternalValue] = useState(meta.value);

  return (
    <>
      {label && (
        <div className={styles.LabelRow}>
          <Typography variant="subtitle1">{label}</Typography>
          <Typography variant="button">
            {(internalValue * 10).toFixed(1)}
          </Typography>
        </div>
      )}
      <Slider
        value={internalValue}
        onMouseDown={() => !meta.touched && helpers.setTouched(true)}
        // onBlur={() => field.onBlur()}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        step={step}
        valueLabelFormat={(val) => (val * 10).toFixed(1)}
        onChange={(e, val) => setInternalValue(val)}
        onChangeCommitted={(e, val) => helpers.setValue(val)}
      />
      {meta.error && meta.touched && (
        <Typography color="error" variant="caption">
          {meta.error}
        </Typography>
      )}
    </>
  );
};

FormikMuiSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

FormikMuiSlider.defaultProps = {
  min: 0,
  max: 100,
  label: '',
  step: 1,
};

export default FormikMuiSlider;
