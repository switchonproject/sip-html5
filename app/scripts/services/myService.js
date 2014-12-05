angular.module(
    'de.cismet.myAngularApp.services'
).factory('de.cismet.myAngularApp.services.MyService',
    [
        function () {
            'use strict';

            return {
                tellMe: function () { 
                    return 'The \'scripts/services\' folder contains the actual services that will automagically be processed during build.'; 
                }
            };
        }
    ]);
