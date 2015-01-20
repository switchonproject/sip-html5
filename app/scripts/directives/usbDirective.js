angular.module(
    'de.cismet.switchon.sipApp.directives'
).directive('usb',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/usb-directive.html',
                scope: {
                     filterExpressions: '=',
                     resultSet: '='
                     
                },
                controller: 'UsbDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);
