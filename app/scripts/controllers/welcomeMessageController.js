angular.module('eu.water-switch-on.sip.controllers')
        .controller('welcomeMessageController', ['$scope', '$modalInstance', 'hideWelcomeMessage',
            function ($scope, $modalInstance, hideWelcomeMessage) {
                'use strict';
                $scope.hideWelcomeMessage = hideWelcomeMessage;
                $scope.close = function () {
                    $modalInstance.close($scope.hideWelcomeMessage);
                };
            }]);