'use strict';

/**
 * @ngdoc service
 * @name notesApp.configurationService
 * @description
 * # configurationService
 * Factory in the notesApp.
 */
angular.module('notesApp')
  .factory('configurationService', function ($http, observableService) {
    var configService = {};
    // The config service inherits observable service
    configService = new observableService();
    
    configService.loading = false;
    
    // private function to get the configuration
    var getConfiguration = function () {
      configService.loading = true;
      $http.get('configuration.json', {cache: false}).then(function (data) {
        configService.baseUrl = data.data.baseUrl;
        configService.notifyObservers();
        configService.loading = false;
      }, function (error) {
        console.log("Configuration retrieval error!");
        console.log(error);
        configService.loading = false;
      });
    };
    
    // Public function to load the configuration and be notified when it's ready
    configService.loadConfiguration = function (){
      if(!configService.loading){
       getConfiguration(); 
      }
    };
    
    // Is the configuration ready? Yes if the baseUrl is defined and not empty.
    configService.isConfigurationReady = function (){
      return (typeof this.baseUrl === "string") && this.baseUrl !== "";
    };

    /**
     * makeUrl({resource: "notes"})
     * @param args
     * @returns {string} http://localhost:3000/notes
     */
    configService.makeUrl = function (args){
      var result = this.baseUrl + "/" + args.resource;
      if(typeof args.id !== "undefined"){
        result += "/" + args.id;
      }
      return result;
    };

    return configService;
  });
