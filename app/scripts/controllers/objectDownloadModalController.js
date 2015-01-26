angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectDownloadModalController',
    [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            'use strict';

            var i;

            $scope.reps = $scope.object.representation;

            for(i = 0; i < $scope.reps.length; ++i) {
                $scope.reps[i]._status = {
                    open: (i === 0 ? true : false)
                };
            }

            $scope.closeDownloadView = function () {
                $modalInstance.close();
            };
        }
    ]
);