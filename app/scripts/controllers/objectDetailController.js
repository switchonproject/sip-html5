angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectDetailController',
    [
        '$scope',
        // the router resolves this resource object
        'resource',
        function ($scope, resource) {
            'use strict';

            var i;

            $scope.object = resource;
            $scope.reps = $scope.object.representation || [];

            for (i = 0; i < $scope.reps.length; ++i) {
                $scope.reps[i]._status = { // jshint ignore:line
                    open: (i === 0 ? true : false)
                };
            }
        }
    ]
);