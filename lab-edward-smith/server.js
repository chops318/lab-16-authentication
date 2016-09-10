'use strict';

if (!process.env.APP_SECRET) throw new Error('Set APP_SECRET');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const createError = require('http-errors');

let app = express();
let authRouter = require('./routes/auth_router');
let postRouter = require('./routes/post_router');


mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/auth_dev');

app.use(morgan('dev'));
app.use('/api', authRouter);
app.use('/api/post', postRouter);

app.get('*', (req, res, next) => {
  next(createError(404, 'Not found'));
})

app.use((err, req, res, next) => {
  debugger;
  res.status(err.statusCode || 500).json(err.message);
});

const server = app.listen(3000, () => console.log('server up'));

module.exports = exports = server;
