angular.module(
    'eu.water-switch-on.sip.directives'
).directive('dateFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/datefilter-directive.html',
                scope: {
                    fromDateFilterExpression: '=',
                    toDateFilterExpression: '='
                }
            };
        }
    ]);
