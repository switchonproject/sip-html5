angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'ResultSetDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';

                //$scope.description = 'Universal Search Box';
                //$scope.info = MyService.tellMe();
                
                                $scope.alert = function () {
                    alert('alerted!');
                };
            }
        ]
        );
