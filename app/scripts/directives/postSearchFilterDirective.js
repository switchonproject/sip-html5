angular.module(
    'eu.water-switch-on.sip.directives'
).directive('postsearchfilter',
    [
        '$state',
        function ($state) {
            'use strict';

            var link, scope;

            scope = {
                filterExpressions: '=',
                postSearchFilterExpressions: '=',
                postSearchFiltersFilterExpression: '=',
                filterTags: '=',
                performSearch: '&searchFunction',
                notificationFunction: '&?',
                removeThreshold: '='
            };

            link = function (scope, element, attr, toolbarCtrl) {
                var toggleVisibility;

                toggleVisibility = function (state) {
                    scope.isVisible = (state === 'list' || state === 'th');
                    toolbarCtrl.toggleVisibility('resultList', scope.isVisible);
                };

                scope.$on('$stateChangeSuccess', function (event, toState) {
                    toggleVisibility(toState.name);
                });

                toggleVisibility($state.current.name);
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/post-search-filter-directive.html',
                scope: scope,
                controller: 'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
                controllerAs: 'postSearchFilterDirectiveController',
                link: link
            };
        }
    ]);
