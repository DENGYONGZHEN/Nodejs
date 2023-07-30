const AppError = require('../utils/appError');
/**
 * 全局异常处理
 */

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJsonWebTokenError = () =>
  new AppError('Invalid token,please log in again', 401);

const handleTokenExpiredError = () =>
  new AppError('Token has expired! Please log in again', 401);

const sendErrDev = (req, err, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) rendered website
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrProd = (req, err, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A)Operational trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      //Programming or other unknown error: don't leak error detail to clients
    }

    console.error('ERROR 💥', err);
    // B) send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  //B) rendered website
  if (err.isOperational) {
    // A)Operational trusted error: send message to client
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }

  console.error('ERROR 💥', err);
  // B) send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'please try again later!',
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrDev(req, err, res);
  } else if (process.env.NODE_ENV === 'production') {
    console.log(err);
    //注意这里不知道为什么拷贝的error和err不一样，所以下面判断用的err.name
    // let error = { ...err };
    let error = JSON.parse(JSON.stringify(err));
    //if (err.name === 'CastError') {
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    //if (err.name === 'ValidationError') {
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleTokenExpiredError();
    }
    sendErrProd(req, error, res);
  }
};
