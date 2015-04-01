angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.mapViewController',
    [
        '$scope',
        // the router resolves this resource object
        'resource',
        function ($scope, resource) {
            'use strict';

            $scope.object = resource;
        }
    ]
);