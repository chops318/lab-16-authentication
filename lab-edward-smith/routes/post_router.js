
'use strict';

const Post = require('../models/post');
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../lib/error_handler');
const jwt_auth = require('../lib/jwt_auth');
const authorization = require('../lib/authorization');
const HttpError = require('http-errors');

let postRouter = module.exports = exports = require('express').Router();

postRouter.get('/', jsonParser, jwt_auth, authorization(['basic']), (req, res, next) => {
  Post.find().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

postRouter.post('/', jsonParser, jwt_auth, authorization(['basic']), (req, res, next) => {
  if (req.body.name === '' || req.body.body === '') console.log('oi')
  req.body.userId = req.user._id;
  new Post(req.body).save().then(res.json.bind(res), ErrorHandler(400, next));
});
