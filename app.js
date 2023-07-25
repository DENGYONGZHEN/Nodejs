const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// 1) Goobal middleware

//set security HTTP headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//声明 限制同一ip频繁访问
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try in an hour!',
});
//调用
app.use('/api', limiter);

//express.json()  middleware   Body parser  reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

//static files
app.use(express.static(`${__dirname}/public`));

//自定义 middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
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
