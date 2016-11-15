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
    // Set our variables, testing either body or querystring
    let url = req.body.url || req.query.url;
    let method = req.body.method || req.query.method;

    // Make sure we're not adding an empty monitor
    if (typeof url === 'undefined' && typeof method === 'undefined') {
      // Tell the console there's been an error
      console.error('[ERROR] Trying to add empty monitor');

      // Inform the user we couldn't do it
      res.json({
        message: 'Cannot add empty monitor',
      });
    } else {
      // Create new entity
      let entity = new Endpoint({
        url: url,
        method: method,
      });

      // Save result or catch errors
      entity
        .save()
        .then((endpoint) => res.json(endpoint), (error) => res.json(error))
        .catch((error) => console.error(error));
    }
  }
}

module.exports = EndpointController;
