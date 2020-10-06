const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const validatePassword = require('../../helpers/validatePassword');
const User = require('../../models/user.model');

module.exports = ash(async (req, res) => {
  const { body } = req;

  if (!body)
    throw createHttpError(400, 'you must provide a proper user object');

  const newUser = new User();
  if (!newUser) throw createHttpError(400, 'couldnt create new user');

  const { username, email, password, isAdmin, bio, image } = req.body;
  newUser.username = username;
  newUser.email = email;
  newUser.isAdmin = isAdmin;
  newUser.bio = bio;
  newUser.image = image;

  const passwordValidationResults = validatePassword({
    password,
    giveReasons: true,
  });

  console.log('passwordValidationResults', passwordValidationResults);

  if (passwordValidationResults.length) {
    throw createHttpError(
      400,
      `Invalid Password: ${passwordValidationResults.join(', ')}`
    );
  }

  newUser.setPassword(password);

  const user = await newUser.save();
  if (!user)
    throw createHttpError(
      500,
      'Sign up failed. Please try again and/or yell at Jack'
    );

  const token = user.generateAuthToken();
  console.log('token');

  res
    .header('x-auth-token', token)
    .status(200)
    .json({
      success: true,
      message: 'user created successfully',
      user: {
        id: user.id,
        email,
        isAdmin,
        bio,
        image,
        username,
      },
    });
});
