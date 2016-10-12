/**
 * Test Result Schema
 * @author Wes King
 */
'use strict';

// Dependencies
const mongoose = require('mongoose');

let schema = mongoose.Schema({
  code: String,
  body: String,
  headers: String
});

module.exports = mongoose.model('Result', schema);