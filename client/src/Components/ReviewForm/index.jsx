import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { TextField } from 'formik-material-ui';
import styles from './styles.module.scss';
import FormikMuiSlider from '../FormikMuiSlider';
import DrinkReviewSchema from './DrinkReviewSchema';

const ReviewForm = ({ handleSubmitForm, className }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        score: '',
        qualities: {
          flavorAccuracy: 0.125 * 0,
          flavorIntensity: 0.125 * 1,
          bubbles: 0.125 * 2,
          body: 0.125 * 3,
          smell: 0.125 * 4,
          sweetness: 0.125 * 5,
          sour: 0.125 * 6,
          bitter: 0.125 * 7,
        },
      }}
      validationSchema={DrinkReviewSchema}
      onSubmit={handleSubmitForm}
    >
      {({ isSubmitting }) => {
        return (
          <Form className={clsx(styles.FormRoot, className)}>
            <Field
              component={TextField}
              name="title"
              label="Review Title"
              helperText="Short, Sweet, Snappy"
              variant="outlined"
            />
            <Field
              className={styles.Input}
              component={TextField}
              name="description"
              label="Description"
              multiline
              variant="outlined"
              helperText="Let it all out - good or bad"
            />
            <Field
              className={styles.Input}
              component={TextField}
              name="score"
              type="number"
              label="Score"
              variant="outlined"
              helperText="0 to 100"
            />
            <FormikMuiSlider
              label="Flavor Accuracy"
              name="qualities.flavorAccuracy"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Flavor Intensity"
              name="qualities.flavorIntensity"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Bubbles"
              name="qualities.bubbles"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Body (is it thicc?)"
              name="qualities.body"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Smell"
              name="qualities.smell"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Sweetness"
              name="qualities.sweetness"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Sour"
              name="qualities.sour"
              min={0}
              max={1}
              step={0.01}
            />
            <FormikMuiSlider
              label="Bitterness"
              name="qualities.bitter"
              min={0}
              max={1}
              step={0.01}
            />
            <Button
              className={styles.SubmitButton}
              type="submit"
              disabled={isSubmitting}
              color="primary"
              variant="contained"
            >
              Submit Review
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

ReviewForm.propTypes = {
  handleSubmitForm: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ReviewForm.defaultProps = {
  className: '',
};

export default ReviewForm;
