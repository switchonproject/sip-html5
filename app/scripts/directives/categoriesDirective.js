angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'categories',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/categories-directive-template.html',
                scope: {
                    filterExpressions: '=',
                    performSearch: '&searchFunction'
                },
                controller: 'eu.water-switch-on.sip.controllers.categoriesDirectiveController'
            };
        }
    ]
);