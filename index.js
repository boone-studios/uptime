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
const bodyParser = require('body-parser');
const EndpointCtrl = require('./controllers/endpoint');
const ResultCtrl = require('./controllers/result');
const Monitor = require('./monitor/index');

// Connect to DB
mongoose.connect('mongodb://localhost/uptime');

// Local dependencies
//const statusCode = require('./status-code');

// Initialize Express
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve all static files in public folder
app.use(express.static(__dirname + '/public'));

app.get('/status', function (req, res) {
  if (req.accepts('application/json')) {
    var data = JSON.parse(req.query.data);

    // Make sure we're going to have a website to check
    if (Object.keys(data).length) {
      // Define variables
      var options = _.pick(data, ['url', 'method']);
      console.log(options);

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

app.get('/api/monitors', EndpointCtrl.index);
app.post('/api/monitors', EndpointCtrl.post);

app.get('/api/results', ResultCtrl.index);

app.listen(3000, () => {
  let monitor = new Monitor();
  monitor.init();
  console.log('Application up and running!');
});
