angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'DateFilterDirectiveController',
        [
            '$scope','$filter',
            function ($scope, $filter) {
                'use strict';

                //$scope.fromDate; = new Date(2013, 9, 22);
                //$scope.toDate;  = new Date(2015, 1, 15);

                //var dateformat = 'yyyy-MM-dd HH:mm:ss Z'
                var dateformat = 'yyyy-MM-dd'
                var today = 
                $scope.createFilterExpression = function (keyword, parameter)
                {
                    var filterExpression = '';
                    
                    if (typeof parameter !== 'undefined' && parameter !== null && parameter instanceof Date)
                    {
                        filterExpression += (keyword+':');
                        filterExpression += ('"'+$filter('date')(parameter, dateformat)+'" ');
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
