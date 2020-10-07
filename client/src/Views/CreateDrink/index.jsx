import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import { createDrinkAPI } from '../../APIs/drinksAPI';

const CreateDrinkSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(240, 'Too long')
    .required("c'mon, tell me. pretty please"),
  abv: Yup.number()
    .min(0, 'Too low')
    .max(100, 'You would die...')
    .required('Friends dont keep secrets'),
  calories: Yup.number()
    .min(0, 'Doubt it')
    .max(1000, "That's a big can")
    .required('Bro, we gotta know'),
  flavors: Yup.array()
    .of(
      Yup.string()
        .min(0, 'Too short')
        .max(50, 'Too long')
        .required('Cant be blank!')
    )
    .required('Need flavors')
    .min(1, 'It only takes one'),
});

const CreateDrink = () => {
  const handleFormSubmission = async (drinkValues) => {
    console.log('drinkValues', drinkValues);
    try {
      const createDrinkResponse = await createDrinkAPI({ ...drinkValues });
      console.log('createDrinkResponse', createDrinkResponse);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <div className={styles.Root}>
      <Paper className={styles.Paper}>
        <Typography align="center" variant="h6" gutterBottom>
          Add a Drink
        </Typography>
        <Formik
          initialValues={{
            name: '',
            abv: -1,
            calories: -1,
            flavors: [''],
          }}
          validationSchema={CreateDrinkSchema}
          onSubmit={handleFormSubmission}
        >
          {({ values, isSubmitting }) => {
            return (
              <Form className={styles.FormRoot}>
                <Field
                  component={TextField}
                  name="name"
                  label="Drink Name"
                  variant="outlined"
                />
                <ErrorMessage name="name" component="div" />
                <Field
                  component={TextField}
                  type="number"
                  name="abv"
                  label="ABV"
                  variant="outlined"
                />
                <ErrorMessage name="abv" component="div" />
                <Field
                  component={TextField}
                  type="number"
                  name="calories"
                  label="Calories"
                  variant="outlined"
                />
                <ErrorMessage name="calories" component="div" />
                <FieldArray
                  name="flavors"
                  render={(arrayHelpers) => (
                    <>
                      {values.flavors.map((flavor, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`flavors-input-${index}`}
                          className={styles.FlavorRow}
                        >
                          <Field
                            name={`flavors.${index}`}
                            component={TextField}
                            label={`Flavor ${index + 1}`}
                          />
                          <Button
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                          >
                            remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => arrayHelpers.push('')}
                        color="secondary"
                        variant="contained"
                        className={styles.AddFlavorButton}
                      >
                        Add flavor
                      </Button>
                    </>
                  )}
                />
                <Button
                  className={styles.SubmitButton}
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </div>
  );
};

export default CreateDrink;
