const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routers/userRoutes');
const tourRouter = require('./routers/tourRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statusCode = 400;
  // err.status = 'fail';
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
