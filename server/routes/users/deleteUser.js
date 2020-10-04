const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/user.model');

module.exports = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.userId });
  if (!user) {
    throw createHttpError(404, `No user found with id ${req.params.userId}`);
  }

  res.status(200).json({
    success: true,
    user,
  });
});
