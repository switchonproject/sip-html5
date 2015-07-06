angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'masterToolbar',
    [
        function () {
            'use strict';

            var controller, scope;

            scope = {
                resultSet: '=',
                selectedObject: '=',
                filterExpressions: '=',
                postSearchFilterExpressions: '=',
                postSearchFiltersFilterExpression: '=',
                filterTags: '=',
                performSearch: '&',
                notificationFunction: '&?'
            };

            controller = [
                '$scope',
                '$state',
                'eu.water-switch-on.sip.services.masterToolbarService',
                'AppConfig',
                function ($scope,
                        $state,
                        masterToolbarService,
                        AppConfig) {
                    var canShow, visibleComponents;

                    $scope.shouldShow = false;
                    $scope.masterToolbarService = masterToolbarService;
                    $scope.config = AppConfig;

                    visibleComponents = {};

                    this.toggleVisibility = function (componentName, isVisible) {
                        var prop, visible;
                        if (componentName) {
                            visibleComponents[componentName] = isVisible;

                            // check if at least one registered component is visible
                            visible = false;
                            for (prop in visibleComponents) {
                                if (visibleComponents.hasOwnProperty(prop)) {
                                    visible = visible || visibleComponents[prop];
                                }
                            }

                            $scope.shouldShow = visible;

                            // at least one registered component wants to display itself
                            if ($scope.shouldShow) {
                                canShow();
                            }
                        }
                    };

                    canShow = function () {
                        var masterToolbarCanShow;
                        masterToolbarService.setCanShow($scope.shouldShow &&
                                $scope.resultSet &&
                                $scope.resultSet.$collection &&
                                $scope.resultSet.$collection.length > 0 &&
                                (
                                    $state.current.name === 'list' ||
                                    $state.current.name === 'th' ||
                                    $state.current.name === 'map' ||
                                    $state.current.name === 'resourceDetails'
                                ));

                        masterToolbarCanShow = masterToolbarService.getCanShow();

                        // if the toolbar shall always be shown (configurable), 
                        // show it, if it is not already shown
                        if ($scope.config.masterToolbar.alwaysExpanded &&
                                masterToolbarCanShow &&
                                !masterToolbarService.isShowing()) {
                            masterToolbarService.toggleVisibility(true);
                        }

                        return masterToolbarCanShow;
                    };

                    $scope.$watchCollection('resultSet.$collection', function () {
                        canShow();
                    });

                    $scope.$on('$stateChangeSuccess', function () {
                        canShow();
                    });
                }
            ];

            return {
                restrict: 'E',
                templateUrl: 'templates/master-toolbar-template.html',
                controller: controller,
                scope: scope
            };
        }
    ]
);