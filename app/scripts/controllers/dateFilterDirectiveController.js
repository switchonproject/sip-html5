angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.dateFilterDirectiveController',
        [
            '$scope', '$filter',
            function ($scope, $filter) {
                'use strict';
                //var dateformat = 'yyyy-MM-dd HH:mm:ss Z'
                var dateformat = 'yyyy-MM-dd';
                $scope.createFilterExpression = function (keyword, parameter)
                {
                    var filterExpression;

                    if (parameter)
                    {
                        filterExpression = (keyword + ':');
                        filterExpression += ('"' + $filter('date')(parameter, dateformat) + '" ');
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
                }


                $scope.$watch('filterExpressions.fromDate', function (newValue, oldValue) {

                    if(newValue)
                    {
                        var filterExpression = $scope.createFilterExpression('fromDate', newValue);
                        $scope.appendFilterExpression(filterExpression);
                    }
                });

                $scope.$watch('filterExpressions.toDate', function (newValue, oldValue) {

                    if(newValue)
                    {
                        var filterExpression = $scope.createFilterExpression('toDate', newValue);
                        $scope.appendFilterExpression(filterExpression);
                    }
                });
            }
        ]
        );
