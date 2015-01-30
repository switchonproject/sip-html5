angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.countriesFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.MockService',
        function ($scope, MockService) {
            'use strict';

            $scope.countryList = MockService.loadCountriesList($scope.countryGroup);
            $scope.country = null;

            $scope.createFilterExpression = function (country, parameter) {
                var filterExpression;

                if (parameter) {
                    filterExpression = (country + ':');
                    filterExpression += ('"' + parameter + '"');
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

            $scope.$watch('country', function (newValue) {

                if (newValue) {
                    var filterExpression = $scope.createFilterExpression('geo', newValue);
                    $scope.appendFilterExpression(filterExpression);
                }
            });
        }
    ]
);
