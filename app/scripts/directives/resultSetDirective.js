angular.module(
    'de.cismet.switchon.sipApp.directives'
).directive('resultset',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/resultset-directive.html',
                scope: {
                     resultSet: '='
                },
                controller: 'de.cismet.switchon.sipApp.controllers.ResultSetDirectiveController'
            };
        }
    ]);
