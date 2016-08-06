/**
 * @ngdoc function
 * @name notesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the notesApp
 */
angular.module('notesApp')
  .controller('AddNotesController', ['$scope', 'notesService', '$location',
    function ($scope, notesService, $location) {
      'use strict';

      // Initialize an empty note in the scope
      $scope.note = {title: "", text: ""};

      var callbackSuccess = function (){        
        $location.path('/');
      };

      var callbackError = function (error){
        alert("An error occurred!!" + error);
        console.log(error);
      };

      this.saveNote = function (note){
        if(typeof note._id === "undefined") {
          notesService.addElement(note, callbackSuccess, callbackError);
        }else{
          notesService.updateElement(note, callbackSuccess, callbackError);
        }
      };

    }]);
