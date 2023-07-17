const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

dotenv.config({ path: './config.env' });

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
  console.log('hello from middleware 👍');
  next();
});

/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);
app.patch('/api/v1/tours/:id', patchTour);
app.delete('/api/v1/tours/:id', deleteTour);
app.post('/api/v1/tours', postTour); */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
