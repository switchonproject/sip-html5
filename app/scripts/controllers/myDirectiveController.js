angular.module(
    'de.cismet.myAngularApp.controllers'
).controller(
    'de.cismet.myAngularApp.controllers.MyDirectiveController',
    [
        '$scope',
        'de.cismet.myAngularApp.services.MyService',
        function ($scope, MyService) {
            'use strict';
            
            $scope.description = 'The \'scripts/controllers\' folder contains the actual controllers that will automagically be processed during build.';
            $scope.info = MyService.tellMe();
        }
    ]
);
