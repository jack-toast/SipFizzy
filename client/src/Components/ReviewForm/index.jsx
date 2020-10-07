import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';

import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.scss';
import FormikMuiSlider from '../FormikMuiSlider';

const ReviewForm = ({ onSubmit, className }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        score: '',
        bubbles: 0.69,
      }}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form className={clsx(styles.FormRoot, className)}>
            <Field
              component={TextField}
              name="title"
              label="Review Title"
              variant="outlined"
            />
            <Field
              component={TextField}
              name="description"
              label="Description"
              multiline
              variant="outlined"
              helperText="Let it all out - good or bad"
            />
            <Field
              component={TextField}
              name="score"
              type="number"
              label="Overall Score"
              variant="outlined"
              helperText="How'd ya like it?"
            />
            <FormikMuiSlider name="bubbles" min={0} max={1} step={0.01} />
          </Form>
        );
      }}
    </Formik>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ReviewForm.defaultProps = {
  className: '',
};

export default ReviewForm;
