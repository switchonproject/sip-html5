angular.module(
    'eu.water-switch-on.sip.directives'
).directive('resultList',
    [
        '$state',
        function ($state) {
            'use strict';
            
            var link, scope;
            
            scope= {
                resultSet: '=',
                selectedObject: '='
            };
            
            link = function (scope, element, attr, toolbarCtrl) {
                var toggleVisibility;
                
                toggleVisibility = function(state) {
                    scope.isVisible = (state === 'map');
                    toolbarCtrl.toggleVisibility('resultList', scope.isVisible);
                };
                
                scope.$on('$stateChangeSuccess', function(event, toState) {
                    toggleVisibility(toState.name);
                });
                
                toggleVisibility($state.current.name);
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/resultlist-directive.html',
                scope: scope,
                link: link
            };
        }
    ]);
