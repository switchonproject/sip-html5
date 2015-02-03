angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchOptions',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/search-options-directive.html',
                scope: {
                    filterExpressions: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.searchOptionsDirectiveController'
            };
        }
    ]);