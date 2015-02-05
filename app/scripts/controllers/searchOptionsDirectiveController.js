angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.searchOptionsDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            $scope.pattern = /^[1-9]\d*$/;

            if (!$scope.filterExpressions.optionGeoIntersetcs) {
                $scope.filterExpressions.optionGeoIntersetcs = new FilterExpression('geo-intersects', 'false');
            }

            if (!$scope.filterExpressions.optionGeoBuffer) {
                $scope.filterExpressions.optionGeoBuffer = new FilterExpression('geo-intersects');
            }

            if (!$scope.filterExpressions.optionLimit) {
                $scope.filterExpressions.optionLimit = new FilterExpression('limit', 20);
            }

            //$scope.data = {};
            //$scope.data.geoIntersects = 'false';
            //$scope.data.geoBuffer = null;

            $scope.setGeoBuffer = function () {
                var filterExpression = $scope.createFilterExpression('geo-buffer', $scope.data.geoBuffer);
                $scope.appendFilterExpression(filterExpression);
                console.log($scope.optionsForm.geoBufferField.$invalid);
            };

//            $scope.setLimit = function () {
//                var filterExpression = $scope.createFilterExpression('limit', $scope.data.limit);
//                $scope.appendFilterExpression(filterExpression);
//                console.log($scope.optionsForm.geoBufferField.$invalid);
//            };
//
//            $scope.createFilterExpression = function (keyword, parameter) {
//                var filterExpression;
//
//                if (parameter) {
//                    filterExpression = (keyword + ':');
//                    filterExpression += ('"' + parameter + '"');
//                }
//
//                return filterExpression;
//            };
//
//            $scope.appendFilterExpression = function (filterExpression) {
//                if (filterExpression && filterExpression.length > 0) {
//                    if ($scope.filterExpressions.universalSearchString) {
//                        $scope.filterExpressions.universalSearchString += (' ' + filterExpression);
//                    } else {
//                        $scope.filterExpressions.universalSearchString = filterExpression;
//                    }
//                }
//            };

//            $scope.$watch('data.geoIntersects', function (newValue) {
//                if (newValue && newValue === 'true') {
//                    var filterExpression = $scope.createFilterExpression('geo-intersects', newValue);
//                    $scope.appendFilterExpression(filterExpression);
//                }
//            });
        }
    ]
    );
