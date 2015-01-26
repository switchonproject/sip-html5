angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.dateFilterDirectiveController',
        [
            '$scope', 
            'eu.water-switch-on.sip.services.MockService',
            function ($scope, MockService) {
                'use strict';
                
                console.log('loading keywords for group '+$scope.keywordGroup);
                $scope.keywordList = MockService.loadKeywordList($scope.keywordGroup);
                $scope.keyword = null;
                
                $scope.createFilterExpression = function (keyword, parameter)
                {
                    var filterExpression;

                    if (parameter)
                    {
                        filterExpression = (keyword + ':');
                        filterExpression += ('"' + parameter + '" ');
                    }
                    
                    return filterExpression;
                };
                
                $scope.appendFilterExpression = function(filterExpression)
                {
                    if(filterExpression && filterExpression.length > 0)
                    {
                        if ($scope.filterExpressions.universalSearchString) {
                            $scope.filterExpressions.universalSearchString += (' '+filterExpression);
                        }
                        else
                        {
                            $scope.filterExpressions.universalSearchString = filterExpression;
                        }
                    }
                };

                $scope.$watch('keyword', function (newValue) {

                    if(newValue)
                    {
                        var filterExpression = $scope.createFilterExpression($scope.keywordGroup, newValue);
                        $scope.appendFilterExpression(filterExpression);
                    }
                });
            }
        ]
        );
