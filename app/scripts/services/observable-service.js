'use strict';

/**
 * @ngdoc service
 * @name notesApp.observableService
 * @description
 * # observableService
 * Service in the notesApp.
 */
angular.module('notesApp')
  .factory('observableService', function () {
    // A constructor is defined in order to create further services that extend this functionality
    return function () {
      this.observerCallbacks = [];
      //register an observer
      this.registerObserverCallback = function (callback) {
        if (typeof callback !== "function") {
          return;
        }
        this.observerCallbacks.push(callback);
      };
      //unregister an observer
      this.unregisterObserverCallback = function (callback) {
        var found = -1;
        this.observerCallbacks.forEach(function (element, idx) {
          if ((element + '') === (callback + '')) {
            found = idx;
          }
        });
        if (found !== -1) {
          this.observerCallbacks.splice(found, 1);
        }
      };
      this.notifyObservers = function () {
        angular.forEach(this.observerCallbacks, function (callback) {
          callback();
        });
      }
    };
  });
