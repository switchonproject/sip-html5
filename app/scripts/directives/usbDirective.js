angular.module(
    'eu.water-switch-on.sip.directives'
).directive('usb',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/usb-directive.html',
                scope: {
                     filterExpressions: '=',
                     resultSet: '=resourceCollection',
                     notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.usbDirectiveController'
            };
        }
    ]);
