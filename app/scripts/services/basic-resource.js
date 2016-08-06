'use strict';

/**
 * @ngdoc service
 * @name notesApp.basicResource
 * @description
 * # basicResource
 * Factory in the notesApp.
 */
angular.module('notesApp')
  .factory('basicResource', ['observableService', '$http', 'configurationService',
    function (observableService, $http, configurationService) {

      var basicResource;

      // Private variable that retrieves the generic resources
      var getResources = function (resource) {
        basicResource.loading = true;
        var url = configurationService.makeUrl({resource: resource.id});
        $http.get(url).then(function (data) {
          resource.allElements = data.data;
          resource.processElements();
          resource.notifyObservers();
        });
      };

      // Private variable that posts a new resource
      var postResource = function (resource, element, callbackSuccess, callbackError) {
        basicResource.loading = true;
        var url = configurationService.makeUrl({resource: resource.id});
        $http.post(url, element).then(function (data) {
            var newElement = data.config.data;
            newElement._id = data.data.insertedIds[0];
            resource.allElements.push(newElement);
            resource.notifyObservers();
            if (typeof callbackSuccess === "function") {
              callbackSuccess();
            }
          },
          function (error) {
            if (typeof callbackError === "function") {
              callbackError(error);
            }
          });
      };

      // Private variable that posts a new resource
      var putResource = function (resource, element, callbackSuccess, callbackError) {
        basicResource.loading = true;
        var url = configurationService.makeUrl({resource: resource.id, id: element._id});
        $http.put(url, element).then(function (data) {
            resource.notifyObservers();
            if (typeof callbackSuccess === "function") {
              callbackSuccess();
            }
          },
          function (error) {
            if (typeof callbackError === "function") {
              callbackError(error);
            }
          });
      };

      // Private variable that posts a new resource
      var deleteResource = function (resource, element, callbackSuccess, callbackError) {
        basicResource.loading = true;
        var url = configurationService.makeUrl({resource: resource.id, id: element._id});
        $http.delete(url, element).then(function (data) {
            resource.afterDelete(data.config._id);
            resource.notifyObservers();
            if (typeof callbackSuccess === "function") {
              callbackSuccess();
            }
          },
          function (error) {
            if (typeof callbackError === "function") {
              callbackError(error);
            }
          });
      };

      basicResource = function () {
        observableService.apply(this, arguments);
        var self = this;
        this.allElements = [];
        this.currentElement = {};
        this.loading = false;
        this.id = 'resource'; // This id must be replaced by each specific resource

        this.checkValidity = function (element) {
          return typeof element !== "undefined"
        }; 

        this.processElements = function (){
          console.log("Generic processElements method. Replace it by a specific implementation for your resource.");
        };

        this.afterDelete = function (id) {
          console.log("After delete" + id);
          var idx = 0, count = this.allElements.length;
          for(; idx < count; idx += 1){
            if(this.allElements[idx]._id === id){
              this.allElements.splice(idx, 1);
              return;
            }
          }
        };

        this.loadElements = function () {
          if (!this.loading) {
            getResources(this);
          }
        };

        this.addElement = function (element, callbackSuccess, callbackError) {
          if (self.checkValidity(element)) {
            postResource(self, element, callbackSuccess, callbackError);
          } else if (typeof callbackError === "function") {
            callbackError();
          }
        };

        this.updateElement = function (element, callbackSuccess, callbackError) {
          if (self.checkValidity(element)) {
            putResource(self, element, callbackSuccess, callbackError);
          } else if (typeof callbackError === "function") {
            callbackError();
          }
        };

        this.removeElement = function (element, callbackSuccess, callbackError) {
          if (self.checkValidity(element)) {
            deleteResource(self, element, callbackSuccess, callbackError);
          } else if (typeof callbackError === "function") {
            callbackError();
          }
        };

      };

      basicResource.prototype = new observableService();

      return basicResource;

    }]);
