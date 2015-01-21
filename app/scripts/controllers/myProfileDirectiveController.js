angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.myProfileDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.sessionService',
        function ($scope, sessionService) {
            'use strict';

            $scope.user = sessionService.getCurrentUser();
        }
    ]
);