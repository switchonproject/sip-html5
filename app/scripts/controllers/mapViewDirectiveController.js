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
        'AppConfig',
        function ($scope, $window, $timeout, leafletData, rendererService, AppConfig) {
            'use strict';

            var drawCtrl, fireResize, internalChange, MapSearchIcon, objGroup, searchGroup, setObjects,
                setSearchGeom, wicket, config, highlightObjectLayer, setObject;

            config = AppConfig.mapView;

            angular.extend($scope, {
                defaults: {
                    tileLayer: config.backgroundLayer,
                    //maxZoom: 14,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            });

            // <editor-fold defaultstate="collapsed" desc=" window resize " >
            fireResize = function (animate) {
                $scope.currentHeight = $window.innerHeight - $scope.navbarHeight;
                $scope.currentWidth = $window.innerWidth - ($scope.toolbarShowing ? $scope.toolbarWidth : 0);
                leafletData.getMap('mainmap').then(function (map) {
                    map.invalidateSize(animate);
                });
            };

            $scope.currentHeight = $window.innerHeight - $scope.navbarHeight;
            $scope.currentWidth = $window.innerWidth - ($scope.isResultShowing ? $scope.toolbarWidth : 0);

            $scope.$watch('toolbarShowing', function () {
                $timeout(function () {
                    fireResize(true);
                }, 500);
            });

            $scope.center = config.home;

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

                            // clear on illigegal WKT
                            searchGroup.removeLayer($scope.searchGeomLayer);
                            $scope.searchGeomLayer = undefined;
                            $scope.searchGeomWkt = null;
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
                for (i = 0; i < objs.length; ++i) {
                    renderer = rendererService.getFeatureRenderer(objs[i]);
                    if (renderer) {
                        objGroup.addLayer(renderer);
                    }
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

            highlightObjectLayer = function (layer) {
                leafletData.getMap('mainmap').then(function (map) {
                    // FIXME: probably use with layer ids?
                    // see https://github.com/Leaflet/Leaflet/issues/1805

                    objGroup.setStyle(rendererService.defaultStyle);
                    // check if function exists (not available in WMS Layers)
                    if (typeof layer.setStyle === 'function') {
                        layer.setStyle(rendererService.highlightStyle);
                    }

                    if (typeof layer.getBounds === 'function' && layer.getBounds()) {
                        map.fitBounds(layer.getBounds(), {
                            animate: true,
                            pan: {animate: true, duration: 0.6},
                            zoom: {animate: true},
                            maxZoom: null
                        });
                    }
                });
            };

            /**
             * This operation is called when a an object id is provided as part of the route.
             * The object is either loaded from the server of from the cahced object 
             * (search results sored in the share service).
             * 
             * Therfore the functionlaity to showe a single object ion the map is independet 
             * from the functionlaity to show the objects returned from search.
             * 
             * 
             * @param {type} object
             * @returns {undefined}
             */
            setObject = function (object) {
                if (object) {
                    var i, length, layer;

                    // check if the object is already in the list of (search results) objects rendered on the map
                    if ($scope.objects && $scope.objects > 0) {
                        length = $scope.objects.length;
 
                        for (i = 0; i < length; ++i) {
                            if ($scope.objects[i].id === object.id) {
                                if (objGroup.getLayers().length > i) {
                                    highlightObjectLayer(objGroup.getLayers()[i]);
                                }
                                return;
                            }
                        }
                    }

                    // if the object is not cached, add a new layer
                    layer = rendererService.getFeatureRenderer(object);
                    if (layer) {
                        objGroup.addLayer(layer);
                        highlightObjectLayer(layer);
                    }
                }
            };

            $scope.$watch('objects', function (n, o) {
                if (n && n !== o) {
                    setObjects(n);
                }
            });

            if ($scope.objects && !$scope.object) {
                setObjects($scope.objects);
            }

            $scope.$watch('object', function (n, o) {
                if (n && n !== o && !$scope.object) {
                    setObject(n);
                }
            });

            if ($scope.object) {
                setObject($scope.object);
            }

            // </editor-fold>

            $scope.$watch('selectedObject', function (n) {
                if (n !== -1 && objGroup.getLayers().length > n) {
                    highlightObjectLayer(objGroup.getLayers()[n]);
                }
            });
        }
    ]
);