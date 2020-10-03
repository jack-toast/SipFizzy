const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/user.model');

module.exports = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user) {
    throw createHttpError(404, `No user found with id ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    user,
  });
});
