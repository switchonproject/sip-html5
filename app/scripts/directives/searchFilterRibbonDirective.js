angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterRibbon',
    [
        function () {
            'use strict';
            return {
                restrict: 'E',
                templateUrl: 'templates/search-filter-ribbon-directive.html',
                scope: {
                    filterExpressions: '=',
                    notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController'
            };
        }
    ]);
