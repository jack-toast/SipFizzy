import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
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
    .required('Yup, I need this one too'),
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
      <Paper className={styles.Paper} elevation={3}>
        <Typography align="center" variant="h6" gutterBottom>
          Add a Drink
        </Typography>
        <Formik
          initialValues={{
            name: '',
            abv: '',
            calories: '',
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
                  helperText="Brand - Name of Drink"
                />
                <Field
                  component={TextField}
                  type="number"
                  name="abv"
                  label="ABV"
                  variant="outlined"
                  helperText="0% to 100%"
                />
                <Field
                  component={TextField}
                  type="number"
                  name="calories"
                  label="Calories"
                  variant="outlined"
                  helperText="0 to 1000 (large can?)"
                />
                <FieldArray
                  name="flavors"
                  render={(arrayHelpers) => (
                    <>
                      <Typography
                        className={styles.SectionHeader}
                        variant="overline"
                      >
                        Flavors
                      </Typography>
                      {values.flavors.map((flavor, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`flavors-input-${index}`}
                          className={styles.FlavorRow}
                        >
                          <Field
                            name={`flavors.${index}`}
                            component={TextField}
                            variant="outlined"
                            label={`Flavor ${index + 1}`}
                          />
                          {index !== 0 && (
                            <Button
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            >
                              remove
                            </Button>
                          )}
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
