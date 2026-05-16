function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  const message = status === 500 ? 'Something went wrong. Please try again.' : error.message;

  res.status(status);

  if (req.accepts('html')) {
    return res.render('errors/error', {
      title: `${status} Error`,
      status,
      message,
      stack: req.app.get('env') === 'development' ? error.stack : null
    });
  }

  return res.json({
    error: {
      status,
      message,
      ...(req.app.get('env') === 'development' ? { stack: error.stack } : {})
    }
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
