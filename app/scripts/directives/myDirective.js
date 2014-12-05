angular.module(
    'de.cismet.myAngularApp.directives'
).directive('myDirective',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-directive.html',
                scope: {},
                controller: 'de.cismet.myAngularApp.controllers.MyDirectiveController'
            };
        }
    ]);
