import * as Yup from 'yup';

const DrinkReviewSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(100, 'Must be shorter than 100 characters')
    .required('need a title'),
  description: Yup.string().min(2).max(1000).required(),
  score: Yup.number().min(0).max(100).required(),
  qualities: Yup.object()
    .shape({
      flavorAccuracy: Yup.number().min(0).max(10).required(),
      flavorIntensity: Yup.number().min(0).max(10).required(),
      bubbles: Yup.number().min(0).max(10).required(),
      body: Yup.number().min(0).max(10).required(),
      smell: Yup.number().min(0).max(10).required(),
      sweetness: Yup.number().min(0).max(10).required(),
      sour: Yup.number().min(0).max(10).required(),
      bitter: Yup.number().min(0).max(10).required(),
    })
    .required('you need qualities'),
});

export default DrinkReviewSchema;
