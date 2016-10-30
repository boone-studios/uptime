'use strict';

const Endpoint = require('../schema/endpoint');

class EndpointController {
  /**
   * Retrieves a list of currently saved endpoints from the database
   *
   * @param req
   * @param res
   */
  static index(req, res) {
    let query = Endpoint.find();
    let promise = query.exec();

    promise
      .then((results) => res.json(results), (error) => res.sendStatus(404))
      .catch((error) => console.error(error));
  }

  /**
   * Creates a new endpoint for monitoring in the database
   *
   * @param req
   * @param res
   */
  static post(req, res) {
    let entity = new Endpoint({
      url: req.body.url,
      method: req.body.method,
    });

    entity
      .save()
      .then((endpoint) => res.json(endpoint), (error) => res.json(error))
      .catch((error) => console.error(error));
  }

}

module.exports = EndpointController;
