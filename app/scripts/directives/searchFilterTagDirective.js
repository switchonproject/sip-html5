angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterTag',
    [
        'FilterExpression',
        function (FilterExpression) {
            'use strict';
            return {
                restrict: 'EA',
                templateUrl: 'templates/search-filter-tag-directive-template.html',
                scope: {
                    tag: '=',
                    highlightNegated: '=?',
                    removeThreshold: '=',
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
                link: function (scope, elem, attrs) {
                    if (scope.tag.isEditable() && !(scope.tag instanceof FilterExpression.prototype.CollectionTag)) {
                        // the value is saved when the popup is closed
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
                }
            };
        }
    ]);
