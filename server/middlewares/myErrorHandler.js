const myErrorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  // req.log.error(error.name);
  console.log('error handler', JSON.stringify(error, null, 2));

  let status = 500;
  if (error.status) status = error.status;
  else if (error.name === 'ValidationError') {
    status = 400;
  }

  res.status(status).json({
    status,
    error,
    message: error.message || 'Unknown Error Occurred',
  });
};

module.exports = myErrorHandler;
