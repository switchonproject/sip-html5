angular.module(
    'eu.water-switch-on.sip.directives'
).directive('keywordFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/keyword-filter-directive.html',
                scope: {
                    filterExpression: '=',
                    keywordGroup: '@'
                },
                controller: 'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController'
            };
        }
    ]);
