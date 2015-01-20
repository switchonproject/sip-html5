angular.module(
    'de.cismet.switchon.sipApp.directives'
).directive('dateFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/datefilter-directive.html',
                scope: {
                     filterExpressions: '=',
                },
                controller: 'DateFilterDirectiveController'
                /*controllerAs: 'usb',
                transclude:true,
                bindToController:true*/
            };
        }
    ]);
