angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService, FilterExpression) {
            'use strict';

            $scope.keywordParameter = $scope.keywordParameter || 'keyword';
            $scope.keywordGroup = $scope.keywordGroup || 'keyword-free';

            if (!$scope.filterExpressions[$scope.keywordParameter.toString()]) {
                $scope.filterExpressions[$scope.keywordParameter.toString()] = new FilterExpression($scope.keywordParameter.toString(), [], true);
            }

            $scope.keywordFilterExpression = $scope.filterExpressions[$scope.keywordParameter.toString()];
            $scope.keywordList = TagGroupService.getKeywordList($scope.keywordGroup);

//            $scope.keyword = null;

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
//                        $scope.filterExpressions.universalSearchString += ('' + filterExpression);
//                    } else {
//                        $scope.filterExpressions.universalSearchString = filterExpression;
//                    }
//                }
//            };
//
//            $scope.$watch('keyword', function (newValue) {
//                if (newValue) {
//                    var filterExpression = $scope.createFilterExpression($scope.keywordParameter, newValue);
//                    $scope.appendFilterExpression(filterExpression);
//                }
//            });
        }
    ]
);
