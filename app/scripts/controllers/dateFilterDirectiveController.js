angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.dateFilterDirectiveController',
        [
            '$scope', '$filter',
            function ($scope, $filter) {
                'use strict';

                $scope.fromDate =  null;
                $scope.toDate  =  null;

                //var dateformat = 'yyyy-MM-dd HH:mm:ss Z'
                var dateformat = 'yyyy-MM-dd';
                $scope.createFilterExpression = function (keyword, parameter)
                {
                    var filterExpression = '';

                    if (parameter !== null)
                    {
                        filterExpression += (keyword + ':');
                        filterExpression += ('"' + $filter('date')(parameter, dateformat) + '" ');

                    }
                    return filterExpression;
                };


                $scope.$watch('fromDate', function () {

                    var filterExpression = $scope.createFilterExpression('fromDate', $scope.fromDate);
                    $scope.filterExpressions.universalSearchString += filterExpression;
                });

                $scope.$watch('toDate', function () {

                    var filterExpression = $scope.createFilterExpression('toDate', $scope.toDate);
                    $scope.filterExpressions.universalSearchString += filterExpression;
                });
            }
        ]
        );
