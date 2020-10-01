const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const User = require('../../models/userModel');

module.exports = asyncHandler(async (req, res) => {
  const { body } = req;
  if (!body)
    throw createHttpError(400, 'You must provide a body to update a user');

  const user = await User.findById(req.params.id);
  if (!user) throw createHttpError(404, 'User not found');

  const { image, bio } = body;
  if (image) user.image = image;
  if (bio) user.bio = bio;

  const saveResp = await user.save();
  if (!saveResp) throw createHttpError(500, 'failed to update existing user');
  res.status(200).json({
    success: true,
    message: 'user updated',
    user: saveResp,
  });
});
