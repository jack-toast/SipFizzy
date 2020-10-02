const myErrorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  req.log.error(error);

  res.status(error.status || 500);
  res.json({
    status: error.status || 500,
    message: error.message || 'Unknown Error Occurred',
    stack: error.stack,
  });
};

module.exports = myErrorHandler;
