angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'listView',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/list-view-directive.html',
                scope: {
                    filterExpressions: '=',
                    tableData: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.listViewDirectiveController'
            };
        }
    ]
);