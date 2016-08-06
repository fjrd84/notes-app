/**
 * @ngdoc function
 * @name notesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the notesApp
 */
angular.module('notesApp')
  .controller('NotesController', ['$scope', '$location', 'notesService',
    function ($scope, $location, notesService) {
      'use strict';
      $scope.addNote = function () {
        $location.path('add');
      };

      $scope.showNote = function (note){
        console.log(note);
      };

      $scope.removeNote = function (note){
        if(confirm("Are you sure that you want to delete this element?")){
          notesService.removeElement(note, function(){
            console.log('Note removed');
          },
          function(error){
            console.log(error);
            alert("Error while deleting!");
          });
        }
      };

    }]);
