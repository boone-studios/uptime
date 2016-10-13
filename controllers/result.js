const Result = require('../schema/result');
const q = require('q');

class ResultController {
  static index(req, res) {
    Result.find(function (error, results) {
      if (error) {
        return res.json(error);
      }
      return res.json(results);
    })
  }
}

module.exports = ResultController;