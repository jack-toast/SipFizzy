import React, { useState } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { useField } from 'formik';

import styles from './styles.module.scss';
// JY TODO - contribute to the formit-material-ui repo

type Props = {
  label: string;
  min: number;
  step: number;
  max: number;
  name: string;
};
const FormikMuiSlider: React.FC<Props> = ({ label, min, step, max, name }: Props) => {
  // props MUST contain a 'name' value that maps to the formik value with the same name
  const [, meta, helpers] = useField(name);

  // This makes the slider snappy, but avoids potentially sluggish onChange calls
  const [internalValue, setInternalValue] = useState(meta.value);

  return (
    <>
      {label && (
        <div className={styles.LabelRow}>
          <Typography variant="subtitle1">{label}</Typography>
          <Typography variant="button" align="right">
            {internalValue.toFixed(1)}
          </Typography>
        </div>
      )}
      <div className={styles.SliderAndErrorContainer}>
        <Slider
          value={internalValue}
          onMouseDown={() => !meta.touched && helpers.setTouched(true)}
          min={min}
          max={max}
          valueLabelDisplay="auto"
          step={step}
          valueLabelFormat={(val) => val.toFixed(1)}
          onChange={(e, val) => setInternalValue(val)}
          onChangeCommitted={(e, val) => helpers.setValue(val)}
        />
        {meta.error && meta.touched ? (
          <Typography color="error" variant="caption">
            {meta.error}
          </Typography>
        ) : null}
      </div>
    </>
  );
};

export default FormikMuiSlider;
