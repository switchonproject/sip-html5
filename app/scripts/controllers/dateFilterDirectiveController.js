angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'DateFilterDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';

                //$scope.fromDate; = new Date(2013, 9, 22);
                //$scope.toDate;  = new Date(2015, 1, 15);
                
                  $scope.$watch('fromDate',function(){
        
                      if(typeof $scope.fromDate !== 'undefined')
                      {
                          Console.log($scope.filterExpressions.universalSearchString);
                          Console.log($scope.fromDate);
                          $scope.filterExpressions.universalSearchString += $scope.fromDate;
                      }
                      
                      
    });
            }
        ]
        );
