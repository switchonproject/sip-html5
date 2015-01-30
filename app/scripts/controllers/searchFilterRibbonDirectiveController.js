angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';
            $scope.clear = function () {
                $scope.filterExpressions.universalSearchString = '';
                $scope.filterExpressions.fromDate = null;
                $scope.filterExpressions.toDate = null;
            };
        }]
    );