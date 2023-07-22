const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// 1) middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//express.json()  middleware
app.use(express.json());
//static files
app.use(express.static(`${__dirname}/public`));
//自定义 middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);
app.patch('/api/v1/tours/:id', patchTour);
app.delete('/api/v1/tours/:id', deleteTour);
app.post('/api/v1/tours', postTour); */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//如果没有匹配到上面的url，才会执行这里
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this sever`,
  // });
  /*  const err = new Error(`Can't find ${req.originalUrl} on this sever`);
  err.status = 'fail';
  err.statusCode = 404; */
  const err = new AppError(`Can't find ${req.originalUrl} on this sever`, 404);

  next(err);
});

//处理全局异常
app.use(globalErrorHandler);
module.exports = app;
