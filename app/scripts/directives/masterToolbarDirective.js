angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'masterToolbar',
    [
        function () {
            'use strict';
            
            var controller, scope;
            
            scope = {
                resultSet: '='
            };
            
            controller = [
                '$scope',
                '$state',
                'eu.water-switch-on.sip.services.masterToolbarService',
                function ($scope, 
                        $state,
                        masterToolbarService) {
                    var canShow, visibleComponents;
                    
                    $scope.shouldShow = false;
                    $scope.masterToolbarService = masterToolbarService;
                    
                    visibleComponents = {};
                    this.toggleVisibility = function (componentName, isVisible) {
                        var prop, visible;
                        if(componentName) {
                            visibleComponents[componentName] = isVisible;
                            
                            visible = false;
                            for(prop in visibleComponents) {
                                if(visibleComponents.hasOwnProperty(prop)) {
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
                        
                        return masterToolbarService.getCanShow();
                    };
                    
                    $scope.$watchCollection('resultSet.$collection', function() {
                        canShow();
                    });
                    
                    $scope.$on('$stateChangeSuccess', function() {
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