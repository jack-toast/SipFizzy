import * as Yup from 'yup';

const DrinkReviewSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(100, 'Must be shorter than 100 characters')
    .required('need a title'),
  description: Yup.string().min(2).max(100).required(),
  score: Yup.number().min(0).max(100).required(),
  qualities: Yup.object()
    .shape({
      flavorAccuracy: Yup.number().min(0).max(1).required(),
      flavorIntensity: Yup.number().min(0).max(1).required(),
      bubbles: Yup.number().min(0).max(1).required(),
      body: Yup.number().min(0).max(1).required(),
      smell: Yup.number().min(0).max(1).required(),
      sweetness: Yup.number().min(0).max(1).required(),
      sour: Yup.number().min(0).max(1).required(),
      bitter: Yup.number().min(0).max(1).required(),
    })
    .required('you need qualities'),
});

export default DrinkReviewSchema;
