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
                     resultSet: '=resourceCollection'
                },
                controller: 'eu.water-switch-on.sip.controllers.usbDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);
