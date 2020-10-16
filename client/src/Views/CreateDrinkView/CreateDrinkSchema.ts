import * as Yup from 'yup';

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
    .of(Yup.string().min(0, 'Too short').max(50, 'Too long').required('Cant be blank!'))
    .required('Need flavors')
    .min(1, 'It only takes one'),
});

export default CreateDrinkSchema;
