/**
 * Endpoint Test Schema
 * @author Wes King
 */
'use strict';

// Dependencies
const mongoose = require('mongoose');

let schema = mongoose.Schema({
  hostname: String,
  port: String,
  method: String,
  path: String
});

module.exports = mongoose.model('Endpoint', schema);