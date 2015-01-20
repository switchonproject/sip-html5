angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'DefaultViewController',
        [
            '$scope',
            function ($scope) {
                'use strict';

                //$scope.filterExpressions = {universalSearchString:'text:"undefined"'};     
                $scope.filterExpressions = {universalSearchString:''};  
            }
            
        ]
        );
