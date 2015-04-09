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
                    collectionFilterExpression: '=',
                    topicFilterExpression: '=',
                    performSearch: '&searchFunction'
                },
                controller: 'eu.water-switch-on.sip.controllers.categoriesDirectiveController',
                controllerAs: 'categoriesDirectiveController'
            };
        }
    ]
);