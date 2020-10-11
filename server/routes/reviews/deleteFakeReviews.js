const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const { get } = require('lodash');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  console.log('req.user', req.user);
  if (!get(req, 'user.isAdmin'))
    throw createHttpError(403, 'Only admins can do that, sorry');

  const deletionResults = await Review.deleteMany({
    title: /FAKE REVIEW TITLE/i,
  });

  console.log('deletionResults', deletionResults);

  // We need to resync the review scores, num reviews, etc. after we do this...

  res.status(200).json({
    success: true,
    message: 'reviews deleted',
    deletedCount: deletionResults.deletedCount,
    operationTime: deletionResults.operationTime,
  });
});
