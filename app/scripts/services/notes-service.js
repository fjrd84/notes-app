'use strict';

/**
 * @ngdoc service
 * @name notesApp.notesService
 * @description
 * # notesService
 * Factory in the notesApp.
 */
angular.module('notesApp')
  .factory('notesService', ['basicResource', function (basicResource) {
    // notesService uses the basicResource constructor
    var notesService = new basicResource();
    notesService.id = "notes";


    notesService.processElements = function () {
      // A customized processing of the note elements could be inserted here
    };

    return notesService;
  }]);
