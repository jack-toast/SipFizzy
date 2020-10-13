import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { TextField } from 'formik-material-ui';
import { clamp, isEmpty, random, range } from 'lodash';
import { nanoid } from 'nanoid';
import styles from './styles.module.scss';
import FormikMuiSlider from '../../FormikWrappers/FormikMuiSlider';
import DrinkReviewSchema from './DrinkReviewSchema';
import FormikMuiRating from '../../FormikWrappers/FormikMuiRating';
import { useTypedSelector } from '../../../Redux/store';

const getInitScore = (x, { amp = 1, omega = 1, phi = 0, shift = 0 }) => {
  return amp * Math.sin(omega * x * Math.PI - phi) + shift;
};

const getInitScores = (numScores = 8) => {
  const omega = random(3.12, 4.44);
  const amp = random(2, 5);
  const phi = random(-6.0, 6);
  const shift = random(amp, 10 - amp);
  return range(numScores).map((x) => clamp(getInitScore(x, { amp, omega, shift, phi }), 0, 10));
};

const ReviewForm = ({ handleSubmitForm, className, existingValues }) => {
  const errorMessage = useTypedSelector((state) => state.reviewDialog?.error?.message);
  const initScores = useMemo(() => getInitScores(8), []);
  const fakeReviewID = useMemo(() => nanoid(4), []);
  const initialValues = useMemo(() => {
    if (existingValues && !isEmpty(existingValues)) return existingValues;
    return {
      title: `FAKE REVIEW TITLE (${fakeReviewID})`,
      description: `FAKE REVIEW DESCRIPTION (${fakeReviewID})`,
      score: random(0.1, 100),
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
    };
  }, []);
  return (
    <Formik
      initialValues={{
        ...initialValues,
      }}
      validationSchema={DrinkReviewSchema}
      onSubmit={handleSubmitForm}
    >
      {({ isSubmitting }) => {
        return (
          <Form className={clsx(styles.FormRoot, className)}>
            <Typography>Overall Score</Typography>
            <FormikMuiRating
              name="score"
              size="large"
              maxValue={100}
              classes={{
                root: styles.ScoreRoot,
              }}
            />
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
            <div className={styles.SlidersContainer}>
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
              <FormikMuiSlider label="Body" name="qualities.body" min={0} max={10} step={0.1} />
              <FormikMuiSlider label="Smell" name="qualities.smell" min={0} max={10} step={0.1} />
              <FormikMuiSlider
                label="Sweetness"
                name="qualities.sweetness"
                min={0}
                max={10}
                step={0.1}
              />
              <FormikMuiSlider label="Sour" name="qualities.sour" min={0} max={10} step={0.1} />
              <FormikMuiSlider
                label="Bitterness"
                name="qualities.bitter"
                min={0}
                max={10}
                step={0.1}
              />
            </div>
            <Typography color="error">{errorMessage}</Typography>
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
  // eslint-disable-next-line react/forbid-prop-types
  existingValues: PropTypes.object,
};

ReviewForm.defaultProps = {
  className: '',
  existingValues: null,
};

export default ReviewForm;
