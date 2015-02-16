angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.resultSetDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';

            $scope.$watch('selectedObject', function (n) {
                console.log(n);
            });
        }
    ]
    );
