const Endpoint = require('../schema/endpoint');
const q = require('q');

class EndpointController {
  /**
   * Retrieves a list of currently saved endpoints from the database
   *
   * @param req
   * @param res
   */
  static index(req, res) {
    Endpoint.find(function (error, results) {
      if (error) {
        return res.sendStatus(404);
      }
      return res.json(results);
    });
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
      method: req.body.method
    });
    entity.save(function (error, endpoint) {
      if (error) {
        return res.json(error);
      }
      return res.json(endpoint);
    })
  }

}

module.exports = EndpointController;