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

            var offsetFilterExpressions;

            $scope.state = $state;

            offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('text');
            if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                $scope.textFilterExpression = offsetFilterExpressions[0];
            } else {
                $scope.offsetFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_OFFSET,
                    0, false, false);
                $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);
            }
        }
    ]
);
