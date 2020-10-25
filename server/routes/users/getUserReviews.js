const asyncHandler = require('express-async-handler');
const Review = require('../../models/review.model');

module.exports = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const reviews = await Review.find({ userId });

  res.status(200).json({
    success: true,
    userId,
    reviews,
  });
});
