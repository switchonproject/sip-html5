angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.usbDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';
                
                $scope.pattern = /^(\w+:".+"\s?)+$/;     

                $scope.clear = function () {
                    $scope.filterExpressions.universalSearchString = null;
                };

                var appendFilterExpression = function (filterExpression) {

                    if(this.pattern.test(filterExpression))
                    {
                        $scope.filterExpressions.universalSearchString += '';
                        $scope.filterExpressions.universalSearchString += filterExpression;
                    }
                    else
                    {
                        console.error('not a valid filter expression: '+filterExpression);
                    }
                };
            }
        ]
        );
