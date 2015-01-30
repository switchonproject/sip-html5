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

            var drawCtrl, featureGroup, fireResize, MapSearchIcon, wkt;


            // ---- resize START ----
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
            // ---- resize END ----

            MapSearchIcon = L.Icon.extend({
                options: {
                    shadowUrl: null,
                    iconAnchor: new L.Point(16, 31),
                    iconSize: new L.Point(32, 32),
                    iconUrl: 'images/search_point_icon_32.png'
                }
            });
            wkt = new Wkt.Wkt();
            featureGroup = new L.FeatureGroup();
            drawCtrl = new L.Control.Draw({
                draw: {
                    polyline: {
                        shapeOptions: {
                            color: '#7dcd7c'
                        }
                    },
                    polygon: {
                        shapeOptions: {
                            color: '#7dcd7c'
                        }
                    },
                    rectangle: {
                        shapeOptions: {
                            color: '#7dcd7c'
                        }
                    },
                    circle: {
                        shapeOptions: {
                            color: '#7dcd7c'
                        }
                    },
                    marker: {
                        icon: new MapSearchIcon()
                    }
                },
                edit: {
                    featureGroup: featureGroup
                }
            });

            leafletData.getMap('mainmap').then(function (map) {
                map.addLayer(featureGroup);
                map.addControl(drawCtrl);

                map.on('draw:created', function (event) {
                    featureGroup.removeLayer($scope.searchGeomLayer);
                    $scope.searchGeomLayer = event.layer;
                    featureGroup.addLayer($scope.searchGeomLayer);
                });

                map.on('draw:deleted', function (event) {
                    event.layers.eachLayer(function (layer) {
                        if (layer === $scope.searchGeomLayer) {
                            featureGroup.removeLayer($scope.searchGeomLayer);
                            $scope.searchGeomLayer = null;
                        }
                    });
                });
            });
        }
    ]
);