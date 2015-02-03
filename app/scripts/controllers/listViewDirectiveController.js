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
        function ($scope, $filter, $modal, $rootScope, NgTableParams, TagGroupService) {
            'use strict';

            var initialSorting, keywordLookupLists, generateKeywordList;

            $scope.$watch('tableData', function () {
                $scope.tableParams.reload();
            });

            initialSorting = {};
            initialSorting['object.name'] = 'asc';
            keywordLookupLists = {};
            generateKeywordList = function (keywordGroup) {
                var keywordList = TagGroupService.getKeywordList(keywordGroup);
                if (keywordList && !keywordList.$resolved) {
                    console.log('keyword list not yet resolved');
                    keywordList.$promise.then(function () {
                        console.log('keyword list generated');
                        keywordLookupLists[keywordGroup] = keywordList.join('|').toLowerCase().split('|');
                    });
                } else if (keywordList) {
                    keywordLookupLists[keywordGroup] =  keywordList.join('|').toLowerCase().split('|');
                }
            };

            generateKeywordList('keyword-cuashi');
            keywordLookupLists['query-keyword'] = $scope.queryKeywordList;

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