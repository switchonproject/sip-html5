angular.module(
    'eu.water-switch-on.sip.directives'
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
                controller: 'eu.water-switch-on.sip.controllers.resultSetDirectiveController'
            };
        }
    ]);
