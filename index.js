/**
 * Website Uptime Monitor
 * By Boone Software
 */

// Dependencies
const express = require('express');
const q = require('q');

// Initialize Express
const app = express();

// Serve all static files in public folder
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  //console.log('Application up and running!');
});
