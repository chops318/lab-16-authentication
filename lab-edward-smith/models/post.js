'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  userId: String
});

module.exports = exports = mongoose.model('Post', PostSchema);
