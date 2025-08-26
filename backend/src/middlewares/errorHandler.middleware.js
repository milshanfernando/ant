exports.handleError = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode);
  res.json({
    status: "error",
    statusCode,
    message,
  });
  res.end();
};
