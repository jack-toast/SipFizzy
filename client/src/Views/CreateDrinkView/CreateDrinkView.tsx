import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import styles from './CreateDrinkView.module.scss';
import { createDrinkAPI } from '../../APIs/drinksAPI';
import CreateDrinkSchema from './CreateDrinkSchema';
import { NewDrink } from '../../MyTypes/drink';

const CreateDrinkView: React.FC = () => {
  const handleFormSubmission = async (newDrink: NewDrink) => {
    console.log('newDrink', newDrink);
    try {
      const createDrinkResponse = await createDrinkAPI(newDrink);
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
            abv: 0,
            calories: 0,
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
                      <Typography className={styles.SectionHeader} variant="overline">
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

export default CreateDrinkView;
