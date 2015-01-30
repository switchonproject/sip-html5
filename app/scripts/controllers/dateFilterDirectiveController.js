angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.dateFilterDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';

            $scope.createFilterExpression = function (keyword, parameter) {
                var filterExpression;

                if (parameter) {
                    filterExpression = (keyword + ':');
                    filterExpression += ('"' + parameter + '" ');
                }

                return filterExpression;
            };

            $scope.appendFilterExpression = function (filterExpression) {
                if (filterExpression && filterExpression.length > 0) {
                    if ($scope.filterExpressions.universalSearchString) {
                        $scope.filterExpressions.universalSearchString += (' ' + filterExpression);
                    } else {
                        $scope.filterExpressions.universalSearchString = filterExpression;
                    }
                }
            };


            $scope.$watch('filterExpressions.fromDate', function (newValue) {

                if (newValue) {
                    var filterExpression = $scope.createFilterExpression('fromDate', newValue);
                    $scope.appendFilterExpression(filterExpression);
                }
            });

            $scope.$watch('filterExpressions.toDate', function (newValue) {

                if (newValue) {
                    var filterExpression = $scope.createFilterExpression('toDate', newValue);
                    $scope.appendFilterExpression(filterExpression);
                }
            });
        }
    ]
);
