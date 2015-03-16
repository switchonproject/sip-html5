angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.resultSetDirectiveController',
    [
        '$scope',
        '$state',
        'FilterExpression',
        function ($scope, $state, FilterExpression) {
            'use strict';

            var limitFilterExpressions, limitFilterExpression,
                limit, offset;

            offset = 0;
            $scope.state = $state;

            limitFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_LIMIT);
            if (limitFilterExpressions && limitFilterExpressions.length > 0) {
                limitFilterExpression = limitFilterExpressions[0];
            } else {
                limitFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_LIMIT,
                    10, true, false);
                $scope.filterExpressions.addFilterExpression(limitFilterExpression);
            }

            this.next = function () {
                if ($scope.resultSet && $scope.resultSet.$resolved === true) {
                    // limit changed! offset invalid. need to start at 0!
                    limit = $scope.resultSet.$limit;
                    if (limit !== limitFilterExpression.value) {
                        console.warn('limit changed from ' + limit +
                            'to' + limitFilterExpression.value + ', ignoring offset ' +
                            $scope.resultSet.$offset);
                        offset = 0;
                    } else {
                        offset = $scope.resultSet.$offset + limit;
                        offset = offset < $scope.resultSet.$total ? offset : $scope.resultSet.$offset;
                    }
                }

                // angular wrapped function!
                $scope.performSearch({postFilterSearchString: null, offset: offset});
            };

            this.previous = function () {
                if ($scope.resultSet && $scope.resultSet.$resolved === true) {
                    // limit changed! offset invalid. need to start at 0!
                    limit = $scope.resultSet.$limit;
                    if (limit !== limitFilterExpression.value) {
                        console.warn('limit changed from ' + limit +
                            'to' + limitFilterExpression.value + ', ignoring offset ' +
                            $scope.resultSet.$offset);
                        offset = 0;
                    } else {
                        offset = $scope.resultSet.$offset - limit;
                        offset = offset < ($scope.resultSet.$total - limit) ? offset : $scope.resultSet.$offset;
                        offset = offset >= 0 ? offset : 0;
                    }
                }
                // angular wrapped function!
                $scope.performSearch({postFilterSearchString: null, offset: offset});
            };
        }
    ]
);
