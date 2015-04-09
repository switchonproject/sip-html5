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
                    textFilterExpression: '=',
                    filterExpressions: '=',
                    performSearch: '&searchFunction',
                    notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.usbDirectiveController'
            };
        }
    ]);
