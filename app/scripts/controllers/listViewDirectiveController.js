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
        '$q',
        function ($scope, $filter, $modal, $rootScope, NgTableParams, TagGroupService, $q) {
            'use strict';

            var initialSorting, keywordLookupLists = {};

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

            $scope.isHighlightKeyword = function (keywordGroup, keyword) {
                if (keyword !== undefined) {
                    if (keywordLookupLists.hasOwnProperty(keywordGroup)) {
                        return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                    }

                    // lazy load keyword list
                    var keywordList = TagGroupService.getKeywordList(keywordGroup);
                    if (!keywordList.$resolved) {
                        console.log('keyword list not yet resolved');
                        keywordList.$promise.then(function () {
                            if (keywordList.length > 0) {
                                if (!keywordLookupLists.hasOwnProperty(keywordGroup))
                                {
                                    console.log('generating lookup list');
                                    keywordLookupLists[keywordGroup] = keywordList.join('|').toLowerCase().split('|');
                                    return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                                }
                                return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                            }
                            return false;
                        });
                    } else {
                        console.log('keyword list already resolved');
                        keywordLookupLists[keywordGroup] = keywordList.join('|').toLowerCase().split('|');
                        return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                    }
                }
                return false;
            };
        }
    ]
    );