angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.myWorkspaceDirectiveController',
    [
        '$scope',
        '$state',
        '$timeout',
        function ($scope, $state, $timeout) {
            'use strict';

            $scope.user = {};
            $scope.user.name = 'Anonymous';

            $scope.status = {};
            $scope.status.isopen = false;
            $scope.status.scheduleOpen = false;

            $scope.showProfile = function () {
                $state.go('profile', {});
            };

            $scope.popup = function (doPopup) {
                if (doPopup) {
                    $scope.status.scheduleOpen = true;
                    $timeout(function () {
                        if ($scope.status.scheduleOpen === true) {
                            $scope.status.isopen = true;
                        }
                        $scope.status.scheduleOpen = false;
                    }, 300);
                } else {
                    $scope.status.scheduleOpen = false;
                    $scope.status.isopen = false;
                }
            };
        }
    ]
);