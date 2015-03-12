angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.resultSetDirectiveController',
    [
        '$scope',
        '$state',
        function ($scope, $state) {
            'use strict';

            $scope.state = $state;
        }
    ]
);
