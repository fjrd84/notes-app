'use strict';

/**
 * @ngdoc overview
 * @name notesApp
 * @description
 * # notesApp
 *
 * Main module of the application.
 */
angular
  .module('notesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/notes.html',
        controller: 'NotesController',
        controllerAs: 'notesCtrl'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddNotesController',
        controllerAs: 'addNotesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
