angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.mapViewDirectiveController',
    [
        '$scope',
        '$window',
        '$timeout',
        'leafletData',
        function ($scope, $window, $timeout, leafletData) {
            'use strict';

            var drawCtrl, featureGroup, fireResize, internalChange, MapSearchIcon, setSearchGeom, wicket;


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
            wicket = new Wkt.Wkt();
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
                    // no circles for starters as not compatible with WKT
                    circle: false,
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
                    setSearchGeom(event.layer);
                });

                map.on('draw:deleted', function (event) {
                    event.layers.eachLayer(function (layer) {
                        if (layer === $scope.searchGeomLayer) {
                            setSearchGeom(null);
                        }
                    });
                });
            });

            setSearchGeom = function (layer) {
                featureGroup.removeLayer($scope.searchGeomLayer);
                $scope.searchGeomLayer = layer;
                if (layer !== null) {
                    featureGroup.addLayer($scope.searchGeomLayer);
                }
                
                if ($scope.centerSearchGeometry) {
                    leafletData.getMap('mainmap').then(function (map) {
                        map.fitBounds(featureGroup.getBounds(), {
                            animate: true,
                            pan: {animate: true, duration: 0.6},
                            zoom: {animate: true},
                            maxZoom: $scope.preserveZoomOnCenter ? map.getZoom() : null
                        });
                    });
                }
            };

            internalChange = false;
            $scope.$watch('searchGeomLayer', function (n, o) {
                var wkt;

                if (internalChange) {
                    internalChange = false;
                } else {
                    if (n !== undefined && n !== o) {
                        if (n === null) {
                            wkt = '';
                        } else {
                            wicket.fromObject(n);
                            wkt = wicket.write();
                        }
                        internalChange = true;
                        $scope.searchGeomWkt = wkt;
                    }
                }
            });

            $scope.$watch('searchGeomWkt', function (n, o) {
                if (internalChange) {
                    internalChange = false;
                } else {
                    if (n && n !== o) {
                        try {
                            wicket.read(n);
                            internalChange = true;
                            setSearchGeom(wicket.toObject({color: '#7dcd7c', icon: new MapSearchIcon()}));
                        } catch (e) {
                            // ignore illegal wkt
                        }
                    }
                }
            });
        }
    ]
);