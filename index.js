/*********************************
    Uptime Website Monitor
    By Boone Software
 *********************************/

// Node dependencies
const express = require('express');
const http = require('q-io/http');
const q = require('q');
const _ = require('underscore');
const mongoose = require('mongoose');

// Connect to DB
//mongoose.connect('mongodb://localhost/uptime');

// Local dependencies
//const statusCode = require('./status-code');

// Initialize Express
const app = express();

// Serve all static files in public folder
app.use(express.static(__dirname + '/public'));

app.get('/status', function (req, res) {
  if (req.accepts('application/json')) {
    var data = JSON.parse(req.query.data);

    // Make sure we're going to have a website to check
    if (Object.keys(data).length) {
      // Define variables
      var options = _.pick(data, ['url', 'method']);

      // Send HTTP request
      http.request(options).then((response) => {
        // Send status code
        res.sendStatus(response.status);
      }, (error) => {
        // We failed
        res.sendStatus(404);
      });
    }
  } else {
    res.sendStatus(406);
  }
});

app.listen(3000, () => {
  //console.log('Application up and running!');
});
