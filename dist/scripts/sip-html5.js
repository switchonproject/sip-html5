// main app module registration
angular.module(
    'eu.water-switch-on.sip',
    [
        'eu.water-switch-on.sip.controllers',
        'eu.water-switch-on.sip.directives',
        'eu.water-switch-on.sip.services',
        'eu.water-switch-on.sip.filters',
        'ui.router',
        'ngResource'
    ]
).config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            'use strict';
            
            $urlRouterProvider.otherwise('/list');

            $stateProvider.state('list', {
                url: '/list',
                templateUrl: 'views/listView.html'
            });
            $stateProvider.state('th', {
                url: '/th',
                templateUrl: 'views/thumbnailView.html'
            });
            $stateProvider.state('map', {
                url: '/map',
                templateUrl: 'views/mapView.html'
            });
            $stateProvider.state('profile', {
                url: '/profile',
                templateUrl: 'views/profileView.html'
            });
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'views/loginView.html'
            });
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.controllers',
    [
        'ui.bootstrap.dropdown',
        'ui.bootstrap.alert',
        'ui.bootstrap.modal',
        'mgcrea.ngStrap.popover',
        'ui.bootstrap.accordion',
        'leaflet-directive'
    ]
);

angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.dateFilterDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';

                $scope.createFilterExpression = function (keyword, parameter)
                {
                    var filterExpression;

                    if (parameter)
                    {
                        filterExpression = (keyword + ':');
                        filterExpression += ('"' + parameter + '" ');
                    }
                    
                    return filterExpression;
                };
                
                $scope.appendFilterExpression = function(filterExpression)
                {
                    if(filterExpression && filterExpression.length > 0)
                    {
                        if ($scope.filterExpressions.universalSearchString) {
                            $scope.filterExpressions.universalSearchString += (' '+filterExpression);
                        }
                        else
                        {
                            $scope.filterExpressions.universalSearchString = filterExpression;
                        }
                    }
                };


                $scope.$watch('filterExpressions.fromDate', function (newValue) {

                    if(newValue)
                    {
                        var filterExpression = $scope.createFilterExpression('fromDate', newValue);
                        $scope.appendFilterExpression(filterExpression);
                    }
                });

                $scope.$watch('filterExpressions.toDate', function (newValue) {

                    if(newValue)
                    {
                        var filterExpression = $scope.createFilterExpression('toDate', newValue);
                        $scope.appendFilterExpression(filterExpression);
                    }
                });
            }
        ]
        );

angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController',
        [
            '$scope', 
            'eu.water-switch-on.sip.services.MockService',
            function ($scope, MockService) {
                'use strict';
                
                console.log('loading keywords for group '+$scope.keywordGroup);
                $scope.keywordList = MockService.loadKeywordList($scope.keywordGroup);
                $scope.keyword = null;
                
                $scope.createFilterExpression = function (keyword, parameter)
                {
                    var filterExpression;

                    if (parameter)
                    {
                        filterExpression = (keyword + ':');
                        filterExpression += ('"' + parameter + '"');
                    }
                    
                    return filterExpression;
                };
                
                $scope.appendFilterExpression = function(filterExpression)
                {
                    if(filterExpression && filterExpression.length > 0)
                    {
                        if ($scope.filterExpressions.universalSearchString) {
                            $scope.filterExpressions.universalSearchString += (' '+filterExpression);
                        }
                        else
                        {
                            $scope.filterExpressions.universalSearchString = filterExpression;
                        }
                    }
                };

                $scope.$watch('keyword', function (newValue) {

                    if(newValue)
                    {
                        var filterExpression = $scope.createFilterExpression($scope.keywordGroup, newValue);
                        $scope.appendFilterExpression(filterExpression);
                    }
                });
            }
        ]
        );

angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.listViewDirectiveController',
    [
        '$scope',
        '$filter',
        '$modal',
        '$rootScope',
        'ngTableParams',
        function ($scope, $filter, $modal, $rootScope, NgTableParams) {
            'use strict';

            var initialSorting;

            $scope.$watch('tableData', function () {
                $scope.tableParams.reload();
            });

            initialSorting = {};
            initialSorting['object.name'] = 'asc';

            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 2,
                sorting: initialSorting
            }, {
                counts: [],
                total: 1,
                getData: function ($defer, params) {
                    var ordered;

                    ordered = params.sorting() ? $filter('orderBy')($scope.tableData, params.orderBy()) : $scope.tableData;
                    $defer.resolve(ordered);
                }
            });

            $scope.showInfo = function (object) {
                var modalInstance, scope;
                
                scope = $rootScope.$new(true);
                scope.object = object;
                
                modalInstance = $modal.open({
                    templateUrl: 'templates/object-info-modal-template.html',
                    controller: 'eu.water-switch-on.sip.controllers.objectInfoModalController',
                    scope: scope,
                    size: 'lg'
                });
            };
            
            $scope.showDownload = function (object) {
                var modalInstance, scope;
                
                scope = $rootScope.$new(true);
                scope.object = object;

                modalInstance = $modal.open({
                    templateUrl: 'templates/object-download-modal-template.html',
                    controller: 'eu.water-switch-on.sip.controllers.objectDownloadModalController',
                    scope: scope,
                    size: 'lg'
                });
            };
        }
    ]
);
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
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.masterController',
    [
        '$scope',
        '$state',
        function ($scope, $state) {
            'use strict';

            $scope.data = {};
            $scope.data.message = 'Application loaded';
            $scope.data.messageType = 'success';

            $scope.isResultShowing = false;
            $scope.state = $state;
            
            $scope.filterExpressions = {};
            $scope.filterExpressions.universalSearchString = '';
            $scope.filterExpressions.fromDate = null;
            $scope.filterExpressions.toDate = null;
            $scope.data.resultSet = null;

            $scope.activateView = function (state) {
                $scope.showMessage(state + ' view showing', 'success');
                $state.go(state, {});
            };

            $scope.toggleResultView = function () {
                $scope.isResultShowing = !$scope.isResultShowing;
            };

            $scope.doCloseMessage = function () {
                $scope.data.message = null;
            };

            $scope.showMessage = function (message, type) {
                $scope.data.message = message;
                $scope.data.messageType = type;
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.myProfileDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.sessionService',
        function ($scope, sessionService) {
            'use strict';

            $scope.user = sessionService.getCurrentUser();
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.myWorkspaceDirectiveController',
    [
        '$scope',
        '$state',
        '$timeout',
        'eu.water-switch-on.sip.services.sessionService',
        function ($scope, $state, $timeout, sessionService) {
            'use strict';

            $scope.user = sessionService.getCurrentUser();
            $scope.sessionService = sessionService;

            $scope.status = {};
            $scope.status.isopen = false;
            $scope.status.scheduleOpen = false;

            $scope.showProfile = function () {
                $state.go('profile', {});
            };

            $scope.popup = function (doPopup) {
                if (doPopup) {
                    $scope.status.scheduleOpen = true;
                    $timeout(function () {
                        if ($scope.status.scheduleOpen === true) {
                            $scope.status.isopen = true;
                        }
                        $scope.status.scheduleOpen = false;
                    }, 300);
                } else {
                    $scope.status.scheduleOpen = false;
                    $scope.status.isopen = false;
                }
            };
        }
    ]
);
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

            $scope.reps = $scope.object.representation ? $scope.object.representation : [];

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
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectInfoModalController',
    [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            'use strict';
            
            $scope.closeInfoView = function () {
                $modalInstance.close();
            };
        }
    ]
);
angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.resultSetDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';

                //$scope.description = 'Universal Search Box';
                //$scope.info = MyService.tellMe();
                
                                $scope.alert = function () {
                    console.log('alerted!');
                };
            }
        ]
        );

angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
        [
            '$scope',
            function ($scope) {
                'use strict';
                $scope.keywords = ['air', 'Area', 'Atmosphere', 'Benthic', 'Benthic species', 
                    'Biological', 'Biological community', 'Biological taxa', 'Biomass', 'Carbon', 
                    'Chemical', 'Density', 'Descriptive', 'discharge', 'Dissolved Gas', 'Dissolved Solids', 
                    'Energy', 'evaporation', 'Fish', 'Fish species', 'flux', 'Ice', 'Indicator Organisms', 
                    'Inorganic', 'lake', 'Length', 'Level', 'Macrophyte species', 'Major', 'Minor', 'Nekton', 
                    'Nekton species', 'Nitrogen', 'Nutrient', 'ocean', 'Optical', 'Organic', 'Other organic chemical', 
                    'Oxygen Demand', 'PCBs', 'Pesticide', 'Phosphorus', 'Physical', 'Phytoplankton species', 'Pigment', 
                    'precipitation', 'Pressure', 'Radiochemical ', 'snow', 'soil', 'Stable Isotopes', 'stream', 
                    'suspended solids', 'Temperature', 'Velocity', 'Volume', 'water', 'Water content', 'wind', 
                    'Zooplankton species'];
            }]
        );
angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.usbDirectiveController',
        [
            '$scope',
            'eu.water-switch-on.sip.services.SearchService',
            function ($scope, SearchService) {
                'use strict';

                $scope.pattern = /^(\w+:".+"\s?)+$/;

                $scope.clear = function () {
                    $scope.filterExpressions.universalSearchString = '';
                    $scope.filterExpressions.fromDate = null;
                    $scope.filterExpressions.toDate = null;
                };

                $scope.performSearch = function (searchForm)
                {
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (searchForm.$invalid) {
                        $scope.notificationFunction({
                            message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                            type: 'warning'
                        });
                        return;
                    }

                    $scope.resultSet = SearchService.search($scope.filterExpressions.universalSearchString, 100, 0);
                };


                $scope.$watch('universalSearchBox.filterExpressionInput.$error.required', function (newValue, oldValue) {

                    if (oldValue === false && newValue === true)
                    {
                        $scope.notificationFunction({
                            message: 'Please enter a filter expression,  e.g. keyword:"water quality".',
                            type: 'info'
                        });
                    }

                });

                $scope.$watch('universalSearchBox.filterExpressionInput.$invalid', function () {

                    if (!$scope.universalSearchBox.filterExpressionInput.$error.required &&
                            $scope.universalSearchBox.filterExpressionInput.$invalid)
                    {
                        $scope.notificationFunction({
                            message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                            type: 'warning'
                        });
                    }
                });
            }
        ]
        );

angular.module(
    'eu.water-switch-on.sip.directives',
    [
        'ngTable',
        'ui.bootstrap.tpls',
        'ui.bootstrap.tabs',
        'ui.bootstrap.typeahead'
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive('dateFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/datefilter-directive.html',
                scope: {
                     filterExpressions: '=',
                },
                controller: 'eu.water-switch-on.sip.controllers.dateFilterDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('keywordFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/keyword-filter-directive.html',
                scope: {
                     filterExpressions: '=',
                     keywordGroup:'@',
                },
                controller: 'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'listView',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/list-view-directive.html',
                scope: {
                    tableData: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.listViewDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'myProfile',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-profile-directive.html',
                scope: {
                },
                controller: 'eu.water-switch-on.sip.controllers.myProfileDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'myWorkspace',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-workspace-directive.html',
                scope: {
                    workspaceName: '@',
                    showMessage: '&'
                },
                controller: 'eu.water-switch-on.sip.controllers.myWorkspaceDirectiveController'
            };
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('resultset',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/resultset-directive.html',
                scope: {
                     resultSet: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.resultSetDirectiveController'
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterRibbon',
    [
        function () {
            'use strict';
            return {
                restrict: 'E',
                templateUrl: 'templates/search-filter-ribbon-directive.html',
                scope: {
                     filterExpressions: '=',
                     notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('usb',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/usb-directive.html',
                scope: {
                     filterExpressions: '=',
                     resultSet: '=resourceCollection',
                     notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.usbDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.filters',
    [
    ]
);

angular.module(
    'eu.water-switch-on.sip.filters'
).filter(
    'txtLen',
    function () {
        'use strict';

        var escapePattern, getRegex;

        escapePattern = /[-\/\\^$*+?.()|[\]{}]/g;

        getRegex = function (s, f) {
            return new RegExp('[' + s.replace(escapePattern, '\\$&') + ']', f);
        };

        /* filter to cut of text if it is longer than the given length. the filter has the following options
         * 
         * - input: string, the text input, if it is not a string the behaviour may not be as expected
         * - txtLen: integer, the length of the resulting string, including 'tpl'
         * - exact: boolean (default=false), if the result string should exactly match 'txtLen' or if it should try to 
         *   cut of the text after a white space character. In any case the resulting string will not exceed 'txtLen'.
         * - tpl: string (default='[...]', the string to use as indicator that the text has been cut off. If the text 
         *   is actually shorter than txtLen it will not be appended.
         * - sentence: boolean (default=false), the filter tries to match one or more sentences within 'txtLen'. 
         *   If 'txtLen' is '0' it will use the first full sentence regardless of the length of the result. 
         *   If 'sentence' is set to 'true' 'exact' will be ignored.
         *   If no sentence is found using the 'sentenceDelimiters' the behaviour is the same as if sentence is set to
         *   'false' which implies that only the 'tpl' is returned if 'txtLen' is '0'
         * - sentenceDelimiters: string (default='.!?;:')
         * */
        return function (input, txtLen, exact, tpl, sentence, sentenceDelimiters) {
            var _exact, _sentence, _sentenceDelimiters, _tpl, match, out, regex;

            if (!input || txtLen === undefined || txtLen === null) {
                throw 'Illegal filter usage: no input or txtLen';
            }

            if (txtLen >= input.length) {
                out = input;
            } else {
                if (exact === undefined || exact === null) {
                    _exact = false;
                } else {
                    _exact = exact;
                }

                if (tpl === undefined || tpl === null) {
                    _tpl = '[...]';
                } else {
                    _tpl = tpl;
                }

                if (sentence === undefined || sentence === null) {
                    _sentence = false;
                } else {
                    _sentence = sentence;
                }

                if (sentenceDelimiters === undefined || sentenceDelimiters === null) {
                    _sentenceDelimiters = '.!?;:';
                } else {
                    _sentenceDelimiters = sentenceDelimiters;
                }

                if (_sentence && txtLen === 0) {
                    match = input.match(getRegex(_sentenceDelimiters, ''));
                    if (match) {
                        if (match.index >= input.length - 1) {
                            out = input;
                        } else {
                            out = input.substr(0, match.index + 1) + ' ' + _tpl;
                        }
                    } else {
                        // nothing found, thus processing as if sentence == false,
                        // which basically means only the tpl (len = 0)
                        out = _tpl;
                    }
                } else {
                    out = input.substr(0, txtLen - _tpl.length);

                    if (_sentence) {
                        regex = getRegex(_sentenceDelimiters, 'g');
                        match = 0;
                        // one char less as we add one if matched
                        while(regex.exec(out.substr(0, out.length - 1)) !== null) {
                            match = regex.lastIndex;
                        }
                        if (match > 0) {
                            out = out.substr(0, match + 1) + ' ';
                        }
                    }

                    if (_exact) {
                        out += _tpl;
                    } else {
                        match = out.match(/\s+\w*$/);
                        if (match) {
                            out = out.substr(0, match.index + 1) + _tpl;
                        } else {
                            out += _tpl;
                        }
                    }
                }
            }

            return out;
        };
    }
);

angular.module(
    'eu.water-switch-on.sip.services',
    [
    ]
);
angular.module(
        'eu.water-switch-on.sip.services'
        ).factory('eu.water-switch-on.sip.services.MockService',
        ['$resource',
            function ($resource) {
                'use strict';

                var searchService = $resource('data/resultSet.json', {});
                var cuashiKeywordsService = $resource('data/cuashiKeywords.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});

                var inspireKeywordsService = $resource('data/inspireKeywords.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});

                var inspireTopicsService = $resource('data/inspireTopics.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});
              
                var keywordsService = $resource('data/keywords.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});

                var searchFunction = function ()
                {
                    return searchService.get();
                };

                var loadKeywordListFunction = function (keywordGroup)
                {
                    switch (keywordGroup) {
                        case 'cuashi_keyword':
                            return cuashiKeywordsService.query();
                        case 'inspire_keyword':
                            return inspireKeywordsService.query();
                        case 'inspire_topic':
                            return inspireTopicsService.query();
                        case 'keyword':
                            return keywordsService.query();
                        default:
                            return null;
                    }
                };

                return {
                    search: searchFunction,
                    loadKeywordList: loadKeywordListFunction
                };
            }
        ]);

angular.module(
        'eu.water-switch-on.sip.services'
        ).factory('eu.water-switch-on.sip.services.SearchService',
        ['$resource', 'eu.water-switch-on.sip.services.Base64',
            function ($resource, Base64) {
                'use strict';
                //var resultSet = $resource('http://crisma.cismet.de/icmm_api/CRISMA.worldstates/:action/', 

                var username = 'admin@SWITCHON';
                var password = 'cismet';
                var authdata = Base64.encode(username + ':' + password);

                var searchResource = $resource('http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results',
                        {
                            limit: 20,
                            offset: 0,
                            omitNullValues: true,
                            deduplicate: true
                        }, {
                    search: {
                        method: 'POST',
                        params: {
                            limit: '@limit',
                            offset: '@offset'
                        },
                        isArray: false,
                        headers: {'Authorization': 'Basic ' + authdata}
                    }
                });

                var searchFunction = function (universalSearchString, limit, offset)
                {
                    var queryObject = {'list': [{'key': 'Query', 'value': universalSearchString}]};
                    return searchResource.search({
                        limit: limit,
                        offset: offset
                    }, queryObject);
                };

                return {search: searchFunction};
            }
        ])

        .factory('eu.water-switch-on.sip.services.Base64', function () {
            /* jshint ignore:start */

            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                                keyStr.charAt(enc1) +
                                keyStr.charAt(enc2) +
                                keyStr.charAt(enc3) +
                                keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);

                    return output;
                },
                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        window.alert("There were invalid base64 characters in the input text.\n" +
                                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                                "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 !== 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 !== 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";

                    } while (i < input.length);

                    return output;
                }
            };

            /* jshint ignore:end */
        });

angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.sessionService',
    [
        '$rootScope',
        function ($rootScope) {
            'use strict';

            var anonymousUsername, currentUser, getAnonymousUser, getCurrentUser, isAnonymousUser, setCurrentUser;

            anonymousUsername = 'Anonymous';

            getAnonymousUser = function () {
                return {
                    name: anonymousUsername
                };
            };

            getCurrentUser = function () {
                return currentUser;
            };

            isAnonymousUser = function (user) {
                if (user && user.name) {
                    return anonymousUsername === user.name;
                }

                return false;
            };

            setCurrentUser = function (user) {
                var oldUser;

                oldUser = currentUser;
                if (user) {
                    currentUser = user;
                    $rootScope.$broadcast('userChanged', oldUser, currentUser);
                } else {
                    throw 'invalid user: ' + user;
                }
            };

            setCurrentUser(getAnonymousUser());

            return {
                getAnonymousUser: getAnonymousUser,
                getCurrentUser: getCurrentUser,
                isAnonymousUser: isAnonymousUser
            };
        }
    ]
);