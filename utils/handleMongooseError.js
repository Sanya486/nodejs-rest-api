const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === "MongooseError" && code === 1100 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;
