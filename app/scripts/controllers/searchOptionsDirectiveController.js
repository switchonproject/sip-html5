angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.searchOptionsDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';

            $scope.pattern = /^[1-9]\d*$/;

            $scope.data = {};
            $scope.data.geoIntersects = 'false';
            $scope.data.geoBuffer = null;

            $scope.setGeoBuffer = function () {
                var filterExpression = $scope.createFilterExpression('geo-buffer', $scope.data.geoBuffer);
                $scope.appendFilterExpression(filterExpression);
                console.log($scope.optionsForm.geoBufferField.$invalid);
            };

            $scope.createFilterExpression = function (keyword, parameter) {
                var filterExpression;

                if (parameter) {
                    filterExpression = (keyword + ':');
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

            $scope.$watch('data.geoIntersects', function (newValue) {
                if (newValue && newValue === 'true') {
                    var filterExpression = $scope.createFilterExpression('geo-intersects', newValue);
                    $scope.appendFilterExpression(filterExpression);
                }
            });
        }
    ]
    );
