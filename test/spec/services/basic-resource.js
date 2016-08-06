'use strict';

describe('Service: basicResource', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var basicResource;
  beforeEach(inject(function (_basicResource_) {
    basicResource = _basicResource_;
  }));

  it('should do something', function () {
    expect(!!basicResource).toBe(true);
  });

});
