'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('notesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('MainTools are defined on the MainController.', function () {
    expect(scope.MainTools !== undefined).toBe(true);
  });
});
