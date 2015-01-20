angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.resultSetDirectiveController',
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
