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
        ).service('AppConfig',
        [function () {
                'use strict';

                this.listView = {};
                // highlight the keywords beloging to the following tag group
                this.listView.highlightKeyword = 'query-keyword';
                // hide all keywords except those beloging to the Tag Group:
                this.listView.filterKeyword = null;
                // show only this man tags
                this.listView.keywordsLimit = 5;

                this.searchService = {};
                this.searchService.username = 'switchon@SWITCHON';
                this.searchService.password = 'switchon';
                this.searchService.defautLimit = 10;
                this.searchService.maxLimit = 50;
                //this.searchService.host = 'http://localhost:8890';
                this.searchService.host = 'http://switchon.cismet.de/legacy-rest1';
                //this.searchService.host = 'http://data.water-switch-on.eu/switchon_server_rest';

                this.mapView = {};
                //this.mapView.backgroundLayer = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

                this.mapView.home = {};
                this.mapView.home.lat = 49.245166;
                this.mapView.home.lng = 6.936809;
                this.mapView.home.zoom = 4;
                this.mapView.maxBounds = {};
                this.mapView.maxBounds.southWest = [90, -180]; // top left corner of map
                this.mapView.maxBounds.northEast = [-90, 180];  // bottom right corner  

                this.mapView.defaults = {
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
                this.mapView.baselayers = {
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

                this.selectedBackgroundLayer = null;

                /* jshint ignore:start */
                this.mapView.layerControlOptions = {
                    container_width: '300px',
                    container_maxHeight: '350px',
                    group_maxHeight: '30px',
                    exclusive: true
                };
                /* jshint ignore:end */

                this.mapView.defaultLayer = L.esri.basemapLayer('Topographic');

                /**
                 * styledLayerControl baseMaps!
                 */
                this.mapView.baseMaps = [
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
                            'Topographic': this.mapView.defaultLayer,
                            'Streets': L.esri.basemapLayer('Streets'),
                            'Imagery': L.esri.basemapLayer('Imagery')
                        }
                    }
                ];
                this.mapView.overlays = [];

                this.gui = {};
                // Development Mode (e.g. enable untested features)
                this.gui.dev = false;

                this.tagFilter = {};
                //this.tagFilter.tagGroups = 'access-condition, function, keyword-x-cuahsi, protocol';
                this.tagFilter.tagGroups = 'access-condition, function, collection';

                this.search = {};
                // clear any postSearchFilter before performing a new search with regular search filters
                this.search.clearPostSearchFilters = true;
                // combines array-type filter expressions in one tag 
                this.search.combineMultileFilterExpressions = true;
                // switch to list view after successfull search
                // set to false to keep map view with search area
                this.search.showListView = true;
                // default limit for search results
                this.search.defautLimit = this.searchService.defautLimit;

                this.postSearchFilter = {};
                // group post search filters when adding to USB
                // if false, each post search filter will be added as distinct negated filter
                this.postSearchFilter.groupPostSearchFilters = true;
                // immediately start the search after applying a post search filter
                this.postSearchFilter.performImplicitSearch = false;
                // wait X ms before perfoming an implict search, thus ginving the user
                // the change to apply additional post search filter
                // NOTE: this option is not yet implemented!
                this.postSearchFilter.implicitSearchDelay = 1000;
                // if all search result are loaded into the client,
                // filtering can be perfomred on the local search result
                this.postSearchFilter.applyFilterLocally = true;
                // expand the post search filter accordions by default
                this.postSearchFilter.expandPostSearchFilters = true;

                this.objectInfo = {};
                this.objectInfo.resourceJsonUrl = 'http://' +
                        this.searchService.username + ':' +
                        this.searchService.password + '@' +
                        this.searchService.host.replace(/.*?:\/\//g, '');
                this.objectInfo.resourceXmlUrl = 'http://data.water-switch-on.eu/csw?request=GetRecordById&service=CSW&version=2.0.2&namespace=xmlns%28csw=http://www.opengis.net/cat/csw/2.0.2%29&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml&ElementSetName=full&id=';

                this.filterExpressionPattern = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

                this.masterToolbar = {};
                // show or hide the "tools" toggle button in the master toolbar
                this.masterToolbar.togglebutton = false;
                // expanded by default. 
                // if togglebutton is not visible and toolbar is expanded, it cannot be hidden
                this.masterToolbar.alwaysExpanded = true;
            }]);