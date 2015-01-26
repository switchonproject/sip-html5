angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.masterController',
    [
        '$scope',
        '$state',
        function ($scope, $state) {
            'use strict';

            $scope.data = {};
            $scope.data.message = 'Application loaded';
            $scope.data.messageType = 'success';

            $scope.isResultShowing = false;
            $scope.state = $state;
            
            $scope.filterExpressions = {universalSearchString: 'text:"anytext"'};
            $scope.data.resultSet = null;

            $scope.activateView = function (state) {
                $scope.showMessage(state + ' view showing', 'success');
                $state.go(state, {});
            };

            $scope.toggleResultView = function () {
                $scope.isResultShowing = !$scope.isResultShowing;
            };

            $scope.doCloseMessage = function () {
                $scope.data.message = null;
            };

            $scope.showMessage = function (message, type) {
                $scope.data.message = message;
                $scope.data.messageType = type;
            };
        }
    ]
);