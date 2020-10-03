const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const checkReviewsValid = require('../../helpers/checkReviewsValid');
const User = require('../../models/userModel');

module.exports = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a user');

  const { bio, image, reviews } = body;

  const update = {
    ...(checkReviewsValid(reviews) && { reviews }),
    bio,
    image,
  };
  req.log.debug({ update }, `updating user: ${req.params.userId}`);

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.userId },
    update,
    { new: true, omitUndefined: true }
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    success: true,
    message: 'user updated',
    user: updatedUser,
  });
});
