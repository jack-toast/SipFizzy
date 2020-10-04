const ash = require('express-async-handler');
const createHttpError = require('http-errors');
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
  newUser.setPassword(password);

  const user = await newUser.save();
  if (!user) throw createHttpError(500, 'failed to save new user. sorry');

  res.status(200).json({
    success: true,
    message: 'user created successfully',
    userId: user.id,
  });
});
