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
        }
    ]
);