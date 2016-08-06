'use strict';

describe('Service: observableService', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var observableService;
  beforeEach(inject(function (_observableService_) {
    observableService = _observableService_;
  }));

  it('should do something', function () {
    expect(!!observableService).toBe(true);
  });

});
