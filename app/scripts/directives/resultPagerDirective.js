angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'resultPager',
    [
        '$state',
        function ($state) {
            'use strict';

            var link, scope;

            scope = {
                resultSet: '=',
            };

            link = function (scope, element, attr, toolbarCtrl) {
                var toggleVisibility;
                
                toggleVisibility = function(state) {
                    scope.isVisible = (state === 'list' || state === 'th' || state === 'map');
                    toolbarCtrl.toggleVisibility('resultPager', scope.isVisible);
                };
                
                scope.$on('$stateChangeSuccess', function(event, toState) {
                    toggleVisibility(toState.name);
                });
                
                toggleVisibility($state.current.name);
                
                scope.previous = function () {
                    if (scope.resultSet && scope.resultSet.previous) {
                        console.log('previous');
                    }
                };
                
                scope.next = function () {
                    if (scope.resultSet && scope.resultSet.next) {
                        console.log('next');
                    }
                };
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/result-pager-template.html',
                scope: scope,
                link: link
            };
        }
    ]
);