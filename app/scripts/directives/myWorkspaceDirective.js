angular.module(
    'eu.water-switch-on.sip.directives'
).directive('myWorkspace',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-workspace-directive.html',
                scope: {
                    workspaceName: '@',
                    showMessage: '&'
                },
                controller: 'eu.water-switch-on.sip.controllers.myWorkspaceDirectiveController'
            };
        }
    ]);
