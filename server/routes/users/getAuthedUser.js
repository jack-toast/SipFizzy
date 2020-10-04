const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/user.model');

module.exports = asyncHandler(async (req, res) => {
  const { user: tokenUser } = req;

  const user = await User.findById(tokenUser.id).select('+email');
  if (!user) throw createHttpError(404, 'user not found');

  res.status(200).json({
    success: true,
    user,
  });
});
