import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { TextField } from 'formik-material-ui';
import { random, range } from 'lodash';
import styles from './styles.module.scss';
import FormikMuiSlider from '../FormikMuiSlider';
import DrinkReviewSchema from './DrinkReviewSchema';

const getInitScore = (x, { amp = 1, omega = 1, phi = 0, shift = 0 }) => {
  return amp * Math.sin(omega * x * Math.PI - phi) + shift;
};

const getInitScores = (numScores = 8) => {
  const omega = 1 / random(3.1, 6.2);
  const amp = random(1, 2.2);
  const phi = random(-6.0, 6);
  const shift = 5;
  return range(numScores).map((x) =>
    getInitScore(x, { amp, omega, shift, phi })
  );
};

const ReviewForm = ({ handleSubmitForm, className }) => {
  const initScores = useMemo(() => getInitScores(8), []);
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        score: 69,
        qualities: {
          flavorAccuracy: initScores[0],
          flavorIntensity: initScores[1],
          bubbles: initScores[2],
          body: initScores[3],
          smell: initScores[4],
          sweetness: initScores[5],
          sour: initScores[6],
          bitter: initScores[7],
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
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Flavor Intensity"
              name="qualities.flavorIntensity"
              min={0}
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Bubbles"
              name="qualities.bubbles"
              min={0}
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Body (is it thicc?)"
              name="qualities.body"
              min={0}
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Smell"
              name="qualities.smell"
              min={0}
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Sweetness"
              name="qualities.sweetness"
              min={0}
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Sour"
              name="qualities.sour"
              min={0}
              max={10}
              step={0.1}
            />
            <FormikMuiSlider
              label="Bitterness"
              name="qualities.bitter"
              min={0}
              max={10}
              step={0.1}
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
