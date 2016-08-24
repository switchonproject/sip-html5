/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

/* global L */
/* global Wkt */
/*jshint sub:true*/

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
                setSearchGeom, setSearchGeomWkt, wicket, config, highlightObjectLayer, setObject, southWest, northEast,
                layerControl;

            config = AppConfig.mapView;

            angular.extend($scope, {
                defaults: {
                    //tileLayer: config.backgroundLayer,
                    //tileLayerOptions: {noWrap: true},
                    //maxZoom: 14,
                    minZoom: config.minZoom,
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

            // set the max bounds of the map
            southWest = (config.maxBounds && angular.isArray(config.maxBounds.southWest)) ?
                            L.latLng(config.maxBounds.southWest[0], config.maxBounds.southWest[1]) :
                            L.latLng(90, -180);
            northEast = (config.maxBounds && angular.isArray(config.maxBounds.northEast)) ?
                            L.latLng(config.maxBounds.northEast[0], config.maxBounds.northEast[1]) :
                            L.latLng(-90, 180);
            $scope.maxBounds = L.latLngBounds(southWest, northEast);
            leafletData.getMap('mainmap').then(function (map) {
                map.setMaxBounds($scope.maxBounds);
            });

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
                    polyline: false,
                    polygon: {
                        shapeOptions: {
                            color: '#800000'
                        },
                        showArea: true,
                        metric: true
                    },
                    rectangle: {
                        shapeOptions: {
                            color: '#800000',
                            clickable: false
                        },
                        metric: true
                    },
                    // no circles for starters as not compatible with WKT
                    circle: false,
                    marker: false
                },
                edit: {
                    featureGroup: searchGroup
                }
            });

            layerControl = L.Control.styledLayerControl(
                    config.baseMaps, config.overlays, config.drawControlOptions);

            leafletData.getMap('mainmap').then(function (map) {
                
                map.addLayer(searchGroup);
                map.addControl(drawCtrl);
                map.addControl(layerControl);
                //config.defaultLayer._map = null;
                if(config.selectedBackgroundLayer) {
                    //map.addLayer(layerControl._layers[config.selectedBackgroundLayer].layer);
                    
                    // select / unselect / select
                    // not sure why this is needed ?!
                    layerControl.selectLayer(layerControl._layers[config.selectedBackgroundLayer].layer);
                    layerControl.unSelectLayer(layerControl._layers[config.selectedBackgroundLayer].layer);
                    layerControl.selectLayer(layerControl._layers[config.selectedBackgroundLayer].layer);
                } else {
                    
                    map.addLayer(config.defaultLayer);
                    layerControl.selectLayer(config.defaultLayer);
                }

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
                
                // save the selected basemap layer to app.config
                map.on('baselayerchange', function (event) {
                    config.selectedBackgroundLayer = L.Util.stamp(event.layer);
                });
            });

            setSearchGeom = function (layer) {
                searchGroup.removeLayer($scope.searchGeomLayer);
                $scope.searchGeomLayer = layer;
                if (layer !== null) {
                    searchGroup.addLayer($scope.searchGeomLayer);
                }

                // center on search geometry
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

            // set the search geometry from WKT String
            setSearchGeomWkt = function (wktString) {
                if (wktString) {
                    try {
                        wicket.read(wktString);
                        internalChange = true;
                        setSearchGeom(wicket.toObject({color: '#800000', icon: new MapSearchIcon()}));
                    } catch (e) {

                        // clear on illigegal WKT
                        searchGroup.removeLayer($scope.searchGeomLayer);
                        $scope.searchGeomLayer = undefined;
                        $scope.searchGeomWkt = null;
                        console.error('ignoring invalid WKT');
                    }
                } else if (wktString === null) {
                    searchGroup.removeLayer($scope.searchGeomLayer);
                    $scope.searchGeomLayer = undefined;
                }
            };

            // internal change flag prevents watches to trigger from internal changes
            // initially set to false
            internalChange = false;

            // set search geom (e.g. from existing filter expression) 
            // when switchon to map view
            setSearchGeomWkt($scope.searchGeomWkt);

            //watch the actual search area and update the WKT String
            // (and thus the filter expression)
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

            // watch the WKT String, e.g. injected from a filter expression
            $scope.$watch('searchGeomWkt', function (n, o) {
                if (internalChange) {
                    internalChange = false;
                } else {
                    if (n && n !== o) {
                        setSearchGeomWkt(n);
                    } else if (n === null) {
                        setSearchGeomWkt(null);
                    }
                }
            });
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc=" objects " >
            objGroup = new L.FeatureGroup();
            leafletData.getMap('mainmap').then(function (map) {
                objGroup.addTo(map);
            });

            /**
             * Set result objects (entities and resources) and add the respective
             * layers to the map.
             * 
             * @param {type} objs
             * @returns {undefined}
             */
            setObjects = function (objs) {
                var i, renderer;

                objGroup.clearLayers();
                objGroup.setStyle(rendererService.defaultStyle);
                for (i = 0; i < objs.length; ++i) {
                    // get WMS or Feature Layers
                    renderer = rendererService.getFeatureRenderer(objs[i]);
                    if (renderer) {
                        objGroup.addLayer(renderer);
                    }
                }

                // center on all object layers 
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

            /**
             * Called when an object is selected
             * 
             * @param {int} layer Index
             * @returns {undefined}
             */
            highlightObjectLayer = function (layerIndex) {
                leafletData.getMap('mainmap').then(function (map) {
                    // FIXME: probably use with layer ids?
                    // see https://github.com/Leaflet/Leaflet/issues/1805

                    var layer, layers, i;
                    layers = objGroup.getLayers();

                    for (i = 0; i < layers.length; i++) {
                        layer = layers[i];

                        // the highlight layer
                        if (i === layerIndex) {
                            // highlight feature layer
                            if (typeof layer.setStyle === 'function') {
                                layer.setStyle(rendererService.highlightStyle);
                            } else if (typeof layer.setOpacity === 'function') {
                               // "enable" the WMS / Tile layer
                                layer.setOpacity(1.0);
                                //layer.bringToFront();
                            }

                            // center on feature layer unless preserve search area is on
                            if (!$scope.searchGeomLayer || ($scope.searchGeomLayer && $scope.preserveSearchArea !== true)) {
                                if (typeof layer.getLatLng  === 'function' && layer.getLatLng()) {
                                    map.setView(layer.getLatLng(), 10, {
                                        animate: true,
                                        pan: {animate: true, duration: 0.6},
                                        zoom: {animate: true}
                                    });
                                } else if (typeof layer.getBounds === 'function' && layer.getBounds()) {
                                    map.fitBounds(layer.getBounds(), {
                                        animate: true,
                                        pan: {animate: true, duration: 0.6},
                                        zoom: {animate: true},
                                        maxZoom: null
                                    });
                                }
                            }
                        } else {
                            if (typeof layer.setStyle === 'function') {
                                layer.setStyle(rendererService.defaultStyle);
                            } else if (typeof layer.setOpacity === 'function') {
                               // "disable" the WMS / Tile layer
                                layer.setOpacity(0.0);
                                //layer.bringToBack();
                            }
                        }
                    }
                });
            };

            /**
             * This operation is called when a an object id is provided as part of the route.
             * The object is either loaded from the server or from the cached object 
             * (search results stored in the share service).
             * 
             * Therfore the functionality to show a single object on the map is independet 
             * from the functionality to show the objects returned from search.
             * 
             * 
             * @param {type} object
             * @returns {undefined}
             */
            setObject = function (object) {
                if (object) {
                    var i, length, layer;

                    // check if the object is already in the list of 
                    // (search results) objects rendered on the map
                    if ($scope.objects && $scope.objects > 0) {
                        length = $scope.objects.length;

                        for (i = 0; i < length; ++i) {
                            if ($scope.objects[i].id === object.id) {
                                if (objGroup.getLayers().length > i) {
                                    highlightObjectLayer(i);
                                }
                                return;
                            }
                        }
                    }

                    // if the object is not cached, add a new layer
                    layer = rendererService.getFeatureRenderer(object);
                    if (layer) {
                        objGroup.addLayer(layer);
                        highlightObjectLayer(objGroup.getLayers().length - 1);
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
                    // FIXME: works only if index of layer correpsonds to index ob object
                    // warning: breaks if no layer can be generated for an object!
                    // other possiblity: attach layer directly to object? 
                    highlightObjectLayer(n);
                }
            });
        }
    ]
);