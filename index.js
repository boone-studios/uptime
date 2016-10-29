/*********************************
    Uptime Website Monitor
    By Boone Software
 *********************************/

// Node dependencies
const _ = require('underscore');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('q-io/http');
const json = require('json');
const mongoose = require('mongoose');
const path = require('path');
const q = require('q');

// Classes
const EndpointCtrl = require('./controllers/endpoint');
const ResultCtrl = require('./controllers/result');
const Monitor = require('./monitor/index');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/uptime');

// Set Mongoose config
mongoose.set('debug', true);

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true,
}));

// Serve all static files in public folder
app.use('/', express.static(path.join(__dirname, 'public')));

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

// API
app.get('/api/monitors', EndpointCtrl.index);
app.get('/api/results', ResultCtrl.index);

app.post('/api/monitors', EndpointCtrl.post);

app.listen(port, () => {
  var monitor = new Monitor();
  monitor.init();
  console.log('Application up and running!');
});
