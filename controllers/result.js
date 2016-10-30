'use strict';

const Result = require('../schema/result');

class ResultController {
  static index(req, res) {
    let query = Result.find();
    let promise = query.exec();

    promise
      .then((results) => res.json(results), (error) => res.json(error))
      .catch((error) => console.error(error));
  }
}

module.exports = ResultController;
