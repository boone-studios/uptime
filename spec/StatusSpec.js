describe('GET /status', function () {
  var jasmine = require('jasmine-ajax');

  beforeEach(function () {
    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  it('should respond with status code', function () {
      var doneFn = jasmine.createSpy('success');

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function (args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open('GET', '/status');
      xhr.send();

      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/status');
      expect(doneFn).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": 'text/plain',
        "responseText": 'awesome response'
      });

      expect(doneFn).toHaveBeenCalledWith('awesome response');
  });
});
