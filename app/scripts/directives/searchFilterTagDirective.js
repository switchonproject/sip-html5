angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterTag',
    [
        function () {
            'use strict';
            return {
                restrict: 'EA',
                templateUrl: 'templates/search-filter-tag-directive-template.html',
                scope: {
                    tag: '=',
                    performRemove: '&?removeFunction',
                    highlightNegated: '=?',
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
                link: function (scope, elem, attrs) {
                    if (scope.tag.origin.isEditable()) {
                        scope.$on('tooltip.hide', function () {
                            var phase;
                            //synchronise filter expression value with editor and displayed tag value
                            //console.log('synchronising ' + scope.tag.origin.value + ' to ' + scope.data.editorValue);
                            scope.tag.origin.value = scope.data.editorValue;

                            //safely apply the new changes
                            phase = scope.$root.$$phase;
                            if (phase !== '$apply' && phase !== '$digest') {
                                scope.$apply();
                            }
                        });
                    }

                    scope.hasRemoveFunction = function () {
                        return angular.isDefined(attrs.removeFunction);
                    };
                }
            };
        }
    ]);
