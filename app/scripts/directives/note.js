'use strict';

/**
 * @ngdoc directive
 * @name notesApp.directive:note
 * @description
 * # note
 */
angular.module('notesApp')
  .directive('note', function () {
    return {
      templateUrl: 'views/directives/note.html',
      restrict: 'E',
      scope: {note: '=noteData'}
    };
  });
