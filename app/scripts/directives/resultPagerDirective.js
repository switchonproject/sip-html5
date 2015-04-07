angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'resultPager',
    [
        '$state',
        'FilterExpression',
        function ($state, FilterExpression) {
            'use strict';

            var link, scope;

            scope = {
                resultSet: '=',
                filterExpressions: '=',
                getPerformSearch: '&searchFunction'
            };

            link = function (scope, element, attr, toolbarCtrl) {
                var limit, limitFilterExpression, limitFilterExpressions, offset, toggleVisibility;

                toggleVisibility = function(state) {
                    scope.isVisible = (state === 'list' || state === 'th' || state === 'map');
                    toolbarCtrl.toggleVisibility('resultPager', scope.isVisible);
                };

                scope.$on('$stateChangeSuccess', function (event, toState) {
                    toggleVisibility(toState.name);
                });

                toggleVisibility($state.current.name);

                limitFilterExpressions = scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_LIMIT);
                if (limitFilterExpressions && limitFilterExpressions.length > 0) {
                    limitFilterExpression = limitFilterExpressions[0];
                } else {
                    limitFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_LIMIT,
                        10, true, false);
                    scope.filterExpressions.addFilterExpression(limitFilterExpression);
                }

                scope.hasPrevious = function () {
                    return (scope.resultSet && scope.resultSet.$offset > 0);
                };

                scope.previous = function () {
                    if (scope.resultSet.$resolved === true && scope.hasPrevious()) {
                        limit = scope.resultSet.$limit;
                        if (limit !== limitFilterExpression.value) {
                            // limit changed! offset invalid. need to start at 0!
                            offset = 0;
                        } else {
                            offset = scope.resultSet.$offset - limit;
                            offset = offset < (scope.resultSet.$total - limit) ? offset : scope.resultSet.$offset;
                            offset = offset >= 0 ? offset : 0;
                        }

                        // angular wrapped function, which is actually a getter for the real function
                        scope.getPerformSearch()(offset, false);
                    }
                };

                scope.hasNext = function () {
                    return (scope.resultSet &&
                                   scope.resultSet.$length < scope.resultSet.$total &&
                                   scope.resultSet.$offset <= (scope.resultSet.$total - scope.resultSet.$limit));
                };

                scope.next = function () {
                    if (scope.resultSet.$resolved === true && scope.hasNext() === true) {
                        limit = scope.resultSet.$limit;
                        if (limit !== limitFilterExpression.value) {
                            // limit changed! offset invalid. need to start at 0!
                            offset = 0;
                        } else {
                            offset = scope.resultSet.$offset + limit;
                            offset = offset < scope.resultSet.$total ? offset : scope.resultSet.$offset;
                        }
                        
                        // angular wrapped function, which is actually a getter for the real function
                        scope.getPerformSearch()(offset, false);
                    }
                };
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/result-pager-template.html',
                scope: scope,
                link: link
            };
        }
    ]
);