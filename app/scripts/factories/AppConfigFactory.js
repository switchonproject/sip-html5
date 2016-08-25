/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

angular.module(
        'eu.water-switch-on.sip.factories'
        ).factory('AppConfig',
        [function () {
                'use strict';

                var appConfig = {};
                appConfig.listView = {};
                // highlight the keywords beloging to the following tag group
                appConfig.listView.highlightKeyword = 'query-keyword';
                // hide all keywords except those beloging to the Tag Group:
                appConfig.listView.filterKeyword = null;
                // show only this man tags
                appConfig.listView.keywordsLimit = 5;

                appConfig.searchService = {};
                appConfig.searchService.username = 'switchon@SWITCHON';
                appConfig.searchService.password = 'switchon';
                appConfig.searchService.defautLimit = 10;
                appConfig.searchService.maxLimit = 50;
                //appConfig.searchService.host = 'http://localhost:8890';
                appConfig.searchService.host = 'http://switchon.cismet.de/legacy-rest1';
                //appConfig.searchService.host = 'http://data.water-switch-on.eu/switchon_server_rest';

                appConfig.mapView = {};
                //appConfig.mapView.backgroundLayer = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
                
                appConfig.mapView.home = {};
                appConfig.mapView.home.lat = 49.245166;
                appConfig.mapView.home.lng = 6.936809;
                appConfig.mapView.home.zoom = 4;
                appConfig.mapView.maxBounds = {};
                appConfig.mapView.maxBounds.southWest = [90, -180]; // top left corner of map
                appConfig.mapView.maxBounds.northEast = [-90, 180];  // bottom right corner  
                
                appConfig.mapView.defaults = {
                    minZoom: 2,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    },
                    controls: {
                        layers: {
                          visible: false,
                          position: 'bottomright',
                          collapsed: true
                        }
                      },
                    tileLayer: ''
                };
                
                /**
                 * angular-leaflet-directive baselayers not used: 
                 * does not synchronise with styledLayerControl!
                 */
                appConfig.mapView.baselayers = {
                    agtopo: {
                            name: 'ArcGis World Topographic',
                            type: 'agsBase',
                            layer: 'Topographic',
                            visible: false
                    },
                    agimagery: {
                        name: 'ArcGis Imagery',
                        type: 'agsBase',
                        layer: 'Imagery',
                        visible: false
                    },
                    opentopo: {
                        name: 'OpenTopoMap',
                        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                        type: 'xyz',
                        visible: false,
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, SRTM | Rendering: © <a href="http://opentopomap.org" target="_blank">OpenTopoMap</a> (CC-BY-SA)'
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz',
                        visible: false,
                        layerOptions: {
                            //noWrap: true,
                            //maxZoom: 14,
                            subdomains: ['a', 'b', 'c'],
                            //continuousWorld: true,
                            attribution: 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors'
                        }
                    },
                    thunderforest: {
                        name: 'Thunderforest Landscape',
                        url: 'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7feb2dce64d744278b638428463c452f',
                        type: 'xyz',
                        visible: false,
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, | Rendering: © <a href="http://thunderforest.com" target="_blank">Thunderforest</a>'
                        }
                    },
                    streets: {
                            name: 'ArcGis Streets',
                            type: 'agsBase',
                            layer: 'Streets',
                            visible: false,
                            layerOptions: {
                                 attribution: 'Esri'
                            }
                    }
                };
                      
                appConfig.selectedBackgroundLayer = null;
                
                 /* jshint ignore:start */
                appConfig.mapView.layerControlOptions = {
                    container_width     : '300px',
                    container_maxHeight : '350px', 
                    group_maxHeight     : '30px',
                    exclusive           : true
                };
                /* jshint ignore:end */
                
                appConfig.mapView.defaultLayer =  L.esri.basemapLayer('Topographic');
                
                /**
                 * styledLayerControl baseMaps!
                 */
                appConfig.mapView.baseMaps = [
                    {
                        groupName: 'OSM Base Maps',
                        expanded: true,
                        layers: {
                            'OpenTopoMap': new L.TileLayer(
                                    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                                        id: 'mainmap',
                                        attribution: 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, SRTM | Rendering: © <a href="http://opentopomap.org" target="_blank">OpenTopoMap</a> (CC-BY-SA)'
                            }), 
                            'Thunderforest': new L.TileLayer(
                                    'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7feb2dce64d744278b638428463c452f', {
                                        id: 'mainmap',
                                        attribution: 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, | Rendering: © <a href="http://thunderforest.com" target="_blank">Thunderforest</a>'
                            }), 
                            'OpenStreetMap': new L.TileLayer(
                                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                        id: 'mainmap',
                                        attribution: 'Map data © <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors'
                            })
                        }  
                    },
                    {
                        groupName: 'ArcGIS Base Maps',
                        expanded: true,
                        layers: {
                            'Topographic': appConfig.mapView.defaultLayer,
                            'Streets': L.esri.basemapLayer('Streets'),
                            'Imagery': L.esri.basemapLayer('Imagery')
                        }
                    }
                ];
                appConfig.mapView.overlays = [];
                
                appConfig.gui = {};
                // Development Mode (e.g. enable untested features)
                appConfig.gui.dev = false;

                appConfig.tagFilter = {};
                //appConfig.tagFilter.tagGroups = 'access-condition, function, keyword-x-cuahsi, protocol';
                appConfig.tagFilter.tagGroups = 'access-condition, function, collection';

                appConfig.search = {};
                // clear any postSearchFilter before performing a new search with regular search filters
                appConfig.search.clearPostSearchFilters = true;
                // combines array-type filter expressions in one tag 
                appConfig.search.combineMultileFilterExpressions = true;
                // switch to list view after successfull search
                // set to false to keep map view with search area
                appConfig.search.showListView = true;
                // default limit for search results
                appConfig.search.defautLimit = appConfig.searchService.defautLimit;

                appConfig.postSearchFilter = {};
                // group post search filters when adding to USB
                // if false, each post search filter will be added as distinct negated filter
                appConfig.postSearchFilter.groupPostSearchFilters = true;
                // immediately start the search after applying a post search filter
                appConfig.postSearchFilter.performImplicitSearch = false;
                // wait X ms before perfoming an implict search, thus ginving the user
                // the change to apply additional post search filter
                // NOTE: this option is not yet implemented!
                appConfig.postSearchFilter.implicitSearchDelay = 1000;
                // if all search result are loaded into the client,
                // filtering can be perfomred on the local search result
                appConfig.postSearchFilter.applyFilterLocally = true;
                // expand the post search filter accordions by default
                appConfig.postSearchFilter.expandPostSearchFilters = true;

                appConfig.objectInfo = {};
                appConfig.objectInfo.resourceJsonUrl = 'http://' +
                        appConfig.searchService.username + ':' +
                        appConfig.searchService.password + '@' +
                        appConfig.searchService.host.replace(/.*?:\/\//g, '');
                appConfig.objectInfo.resourceXmlUrl = 'http://data.water-switch-on.eu/csw?request=GetRecordById&service=CSW&version=2.0.2&namespace=xmlns%28csw=http://www.opengis.net/cat/csw/2.0.2%29&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml&ElementSetName=full&id=';

                appConfig.filterExpressionPattern = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

                appConfig.masterToolbar = {};
                // show or hide the "tools" toggle button in the master toolbar
                appConfig.masterToolbar.togglebutton = false;
                // expanded by default. 
                // if togglebutton is not visible and toolbar is expanded, it cannot be hidden
                appConfig.masterToolbar.alwaysExpanded = true;

                return appConfig;
            }]);