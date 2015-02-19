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
        'eu.water-switch-on.sip.services.TagGroupService',
        'AppConfig',
        function ($scope, $filter, $modal, $rootScope, NgTableParams, TagGroupService, AppConfig) {
            'use strict';

            var initialSorting, keywordLookupLists, generateKeywordList, generateQueryKeywordList;

            $scope.$watch('tableData', function () {
                // this is the list that contains the keyywords of the current query
                generateQueryKeywordList();
                $scope.tableParams.reload();
            });

            initialSorting = {};
            initialSorting['object.name'] = 'asc';
            keywordLookupLists = {};
            generateKeywordList = function (keywordGroup) {
                var keywordList = TagGroupService.getKeywordList(keywordGroup);
                if (keywordList && !keywordList.$resolved) {
                    //console.log('keyword list not yet resolved');
                    keywordList.$promise.then(function () {
                        //console.log('keyword list generated');
                        keywordLookupLists[keywordGroup] = keywordList.join('|').toLowerCase().split('|');
                    });
                } else if (keywordList) {
                    keywordLookupLists[keywordGroup] =  keywordList.join('|').toLowerCase().split('|');
                }
            };

            generateQueryKeywordList = function () {
                var filterExpression, filterExpressions, i, keywordList;
                keywordList = [];
                filterExpressions = $scope.filterExpressions.getFilterExpressionsByType('keyword', true);
                for (i = 0; i < filterExpressions.length; i++) {
                    filterExpression = filterExpressions[i];
                    if (filterExpression && filterExpression.isValid()) {
                        if (filterExpression.value.constructor === Array) {
                            keywordList = keywordList.concat(filterExpression.value.join('|').toLowerCase().split('|'));
                        } else {
                            keywordList.push(filterExpression.value.toLowerCase());
                        }
                    }
                }

                keywordLookupLists['query-keyword'] = keywordList;
            };

            // generate a list with all-lowercase keywords
            generateKeywordList('keyword-cuahsi');

            $scope.config = AppConfig.listView;

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
                    size: 'lg',
                    backdrop: 'static'
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
                    size: 'lg',
                    backdrop: 'static'
                });
            };

            $scope.isHighlightKeyword = function (keywordGroup, keyword) {
                if (keyword !== undefined) {
                    if (keywordLookupLists.hasOwnProperty(keywordGroup)) {
                        return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                    }
                }
                return false;
            };
        }
    ]
);