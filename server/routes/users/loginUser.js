const ash = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/user.model');

// matches '/login'
module.exports = ash(async (req, res) => {
  const { body } = req;

  if (!body) throw createHttpError(400, 'no credentials given');

  if (!body.email) throw createHttpError(400, 'email required');
  if (!body.password) throw createHttpError(400, 'password required');

  const user = await User.findOne({ email: req.body.email }).select(
    '+email +salt +hash'
  );

  if (!user) throw createHttpError(400, 'User not found');

  const passwordValid = user.checkPassword(req.body.password);

  if (!passwordValid) throw createHttpError(400, 'Wrong password');

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .status(200)
    .json({
      success: true,
      message: 'User logged in.',
      user: {
        username: user.username,
        image: user.image,
        isAdmin: user.isAdmin,
      },
    });
});
