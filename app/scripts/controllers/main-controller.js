angular.module('notesApp').controller('MainController',
  ['$scope', 'configurationService', 'notesService',
    function ($scope, configurationService, notesService) {
      'use strict';

      var self = this;

      // Callback to be run when the configuration is ready
      var configurationReady = function () {
        notesService.loadElements();
      };

      // Callbacks to update the scope when new elements are available
      var updateNotes = function () {
        self.notes = notesService.allElements;
      };

      // Register observer callbacks
      notesService.registerObserverCallback(updateNotes);
      configurationService.registerObserverCallback(configurationReady);

      if (configurationService.isConfigurationReady()) {
        configurationReady();
      } else {
        // The observer has been registered: when ready, loadElements will be automatically called.
        configurationService.loadConfiguration();
      }

    }]);
