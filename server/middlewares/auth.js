const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw createHttpError(401, 'No token provided.');

  // We only accept the "Bearer XXX.YYY.ZZZ" form around here
  const token = authHeader.split(' ')[1];

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (!decodedUser) throw createHttpError(401, 'Invalid token');
    req.user = decodedUser;
    console.log('decoded token user', decodedUser);
    next();
  } catch (err) {
    console.log('e', err);
    throw createHttpError(400, err.message);
  }
};
