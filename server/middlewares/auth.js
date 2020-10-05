const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token =
    req.headers['x-access-token'] ||
    req.headers['x-auth-token'] ||
    req.headers.authorization;
  if (!token) throw createHttpError(401, 'No token provided.');

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
