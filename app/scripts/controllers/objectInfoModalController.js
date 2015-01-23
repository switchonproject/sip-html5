angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectInfoModalController',
    [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            'use strict';
            
            $scope.closeInfoView = function () {
                $modalInstance.close();
            };
        }
    ]
);