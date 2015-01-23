angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'myProfile',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-profile-directive.html',
                scope: {
                },
                controller: 'eu.water-switch-on.sip.controllers.myProfileDirectiveController'
            };
        }
    ]
);