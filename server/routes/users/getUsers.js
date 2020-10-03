const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/user.model');

module.exports = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users || !users.length) throw createHttpError(404, 'no users found');

  res.status(200).json({
    success: true,
    users,
  });
});
