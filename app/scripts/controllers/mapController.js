angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.mapController',
    [
        '$scope',
        '$window',
        '$timeout',
        'leafletData',
        function ($scope, $window, $timeout, leafletData) {
            'use strict';

            var fireResize;

            fireResize = function (animate) {
                $scope.currentHeight = $window.innerHeight - 100;
                $scope.currentWidth = $window.innerWidth - ($scope.isResultShowing ? 250 : 0);
                leafletData.getMap('mainmap').then(function (map) {
                    map.invalidateSize(animate);
                });
            };

            // we assume that the nav and button bars are actuall 100 px high
            $scope.currentHeight = $window.innerHeight - 100;
            $scope.currentWidth = $window.innerWidth - ($scope.isResultShowing ? 250 : 0);

            $scope.$watch('isResultShowing', function () {
                $timeout(function () {
                    fireResize(true);
                }, 500);
            });

            $scope.center = {lat: 49.245166, lng: 6.936809, zoom: 18};

            angular.element($window).bind('resize', function () {
                fireResize(false);
            });
        }
    ]
);