angular.module(
    'eu.water-switch-on.sip.directives'
).directive('countriesFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/countries-filter-directive.html',
                scope: {
                    filterExpressions: '=',
                    countryGroup: '@'
                },
                controller: 'eu.water-switch-on.sip.controllers.countriesFilterDirectiveController'
            };
        }
    ]);
