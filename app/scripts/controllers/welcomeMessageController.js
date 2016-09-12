angular.module('eu.water-switch-on.sip.controllers')
        .controller('welcomeMessageController', ['$scope', '$modalInstance',
            function ($scope, $modalInstance) {
                'use strict';
                $scope.hideWelcomeMessage = false;
                $scope.close = function () {
                    $modalInstance.close($scope.hideWelcomeMessage);
                };
            }]);