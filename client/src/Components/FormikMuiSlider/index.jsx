import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Slider } from '@material-ui/core';
import { useField } from 'formik';

// JY TODO - contribute to the formit-material-ui repo
// add slider support

const FormikMuiSlider = ({ min, step, max, ...props }) => {
  // props MUST contain a 'name' value that maps to the formik value with the same name
  const [, meta, helpers] = useField(props);
  const [internalValue, setInternalValue] = useState(meta.value);

  useEffect(() => {
    setInternalValue(meta.value);
    return () => {};
  }, [JSON.stringify(meta.value)]);

  return (
    <>
      <Slider
        value={internalValue}
        // onMouseDown={() => !meta.touched && helpers.setTouched(true)}
        // onBlur={() => field.onBlur()}
        min={min}
        max={max}
        step={step}
        onChange={(e, val) => setInternalValue(val)}
        onChangeCommitted={(e, val) => helpers.setValue(val)}
      />
    </>
  );
};

FormikMuiSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string.isRequired,
};

FormikMuiSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

export default FormikMuiSlider;
