angular.module(
    'eu.water-switch-on.sip.directives'
).directive('postsearchfilter',
    [
        function () {
            'use strict';
            return {
                restrict: 'E',
                templateUrl: 'templates/post-search-filter-directive.html',
                scope: {
                    postSearchFilterExpressions: '=',
                    filterTags: '=',
                    performSearch: '&searchFunction',
                    notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController'
            };
        }
    ]);
