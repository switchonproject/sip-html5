angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.mapViewDirectiveController',
    [
        '$scope',
        '$window',
        '$timeout',
        'leafletData',
        'de.cismet.cids.services.featureRendererService',
        function ($scope, $window, $timeout, leafletData, rendererService) {
            'use strict';

            var drawCtrl, fireResize, internalChange, MapSearchIcon, objGroup, searchGroup, setObjects,
                setSearchGeom, wicket, nexrad;

            angular.extend($scope, {
                defaults: {
                    tileLayer: 'http://{s}.opentopomap.org/{z}/{x}/{y}.png',
                    //maxZoom: 14,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            });

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

            $scope.center = {lat: 49.245166, lng: 6.936809, zoom: 4};

            angular.element($window).bind('resize', function () {
                fireResize(false);
            });
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc=" search geom " >
            MapSearchIcon = L.Icon.extend({
                options: {
                    shadowUrl: null,
                    iconAnchor: new L.Point(16, 31),
                    iconSize: new L.Point(32, 32),
                    iconUrl: 'images/search_point_icon_32.png'
                }
            });
            wicket = new Wkt.Wkt();
            searchGroup = new L.FeatureGroup();
            drawCtrl = new L.Control.Draw({
                draw: {
                    polyline: {
                        shapeOptions: {
                            color: '#800000'
                        }
                    },
                    polygon: {
                        shapeOptions: {
                            color: '#800000'
                        }
                    },
                    rectangle: {
                        shapeOptions: {
                            color: '#800000'
                        }
                    },
                    // no circles for starters as not compatible with WKT
                    circle: false,
                    marker: {
                        icon: new MapSearchIcon()
                    }
                },
                edit: {
                    featureGroup: searchGroup
                }
            });

            leafletData.getMap('mainmap').then(function (map) {
                map.addLayer(searchGroup);
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
                searchGroup.removeLayer($scope.searchGeomLayer);
                $scope.searchGeomLayer = layer;
                if (layer !== null) {
                    searchGroup.addLayer($scope.searchGeomLayer);
                }

                if ($scope.centerSearchGeometry && searchGroup.getLayers().length > 0) {
                    leafletData.getMap('mainmap').then(function (map) {
                        map.fitBounds(searchGroup.getBounds(), {
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
                        $scope.searchGeomTitle = wicket.type;
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
                            setSearchGeom(wicket.toObject({color: '#800000', icon: new MapSearchIcon()}));
                        } catch (e) {
                            // ignore illegal wkt
                        }
                    } else if (n === null) {
                        searchGroup.removeLayer($scope.searchGeomLayer);
                        $scope.searchGeomLayer = undefined;
                    }
                }
            });
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc=" objects " >
            objGroup = new L.FeatureGroup();
            leafletData.getMap('mainmap').then(function (map) {
                objGroup.addTo(map);
            });

            setObjects = function (objs) {
                var i, renderer;

                objGroup.clearLayers();
                for(i = 0; i < objs.length; ++i) {
                    renderer = rendererService.getFeatureRenderer(objs[i]);
                    objGroup.addLayer(renderer);
                }
                
                if ($scope.centerObjects && objGroup.getLayers().length > 0) {
                    leafletData.getMap('mainmap').then(function (map) {
                        map.fitBounds(objGroup.getBounds(), {
                            animate: true,
                            pan: {animate: true, duration: 0.6},
                            zoom: {animate: true},
                            maxZoom: $scope.preserveZoomOnCenter ? map.getZoom() : null
                        });
                    });
                }
            };

            $scope.$watch('objects', function (n, o) {
                if (n && n !== o) {
                    setObjects(n);
                }
            });

            if ($scope.objects) {
                setObjects($scope.objects);
            }

            nexrad = L.tileLayer.wms('http://gis.lebensministerium.at/wmsgw/gs103601/?&service=wms&version=1.1.1&request=GetCapabilities', {
                layers: 'LFRZ:DRAINAGEBASIN',
                format: 'image/png',
                transparent: true,
                attribution: 'Lebensministerium AT'
            });
            //var opentopo = L.tileLayer('http://{s}.opentopomap.org/{z}/{x}/{y}.png');
            leafletData.getMap('mainmap').then(function (map) {
                //opentopo.addTo(map);
                nexrad.addTo(map);
            });
            // </editor-fold>
        }
    ]
);