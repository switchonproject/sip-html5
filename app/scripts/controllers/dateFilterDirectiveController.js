angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.dateFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            if (!$scope.filterExpressions.fromDate) {
                $scope.filterExpressions.fromDate = new FilterExpression('fromDate');
            }

            if (!$scope.filterExpressions.toDate) {
                $scope.filterExpressions.toDate = new FilterExpression('toDate');
            }
        }
    ]
);
