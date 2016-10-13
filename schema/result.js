/**
 * Test Result Schema
 * @author Wes King
 */
'use strict';

// Dependencies
const mongoose = require('mongoose');

let schema = mongoose.Schema({
  endpoint_id: String,
  time: Date,
  code: String,
  headers: Array
});

module.exports = mongoose.model('Result', schema);