const { get } = require('lodash');
const PasswordValidator = require('password-validator');

const schema = new PasswordValidator();

const pwRequirements = {
  min: { val: 8, req: 'too short' },
  max: { val: 100, req: 'too long' },
  uppercase: { val: 1, req: 'missing uppercase' },
  lowercase: { val: 1, req: 'missing lowercase' },
  symbols: { val: 1, req: 'missing symbols (! $ % *)' },
  digits: { val: 1, req: 'missing digits (0 - 9)' },
  spaces: { val: 1, req: 'no spaces allowed' },
};

schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']);

module.exports = ({ password = '', giveReasons = false }) => {
  if (!giveReasons) return schema.validate(password);
  return schema.validate(password, { list: true }).map((failureKey) => {
    return get(pwRequirements, [failureKey, 'req'], failureKey);
  });
};
