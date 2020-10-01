const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/userModel');

module.exports = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) throw createHttpError(404, 'user not found');

  res.status(200).json({
    success: true,
    user,
  });
});
