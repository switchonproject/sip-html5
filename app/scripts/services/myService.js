angular.module(
    'de.cismet.switchon.sipApp.services'
).factory('de.cismet.switchon.sipApp.services.MyService',
    [
        function () {
            'use strict';

            return {
                tellMe: function () { 
                    return 'The Universal Search Box Allows to specifically search for resources by defining different <i>pre-search filters</i> of resources.'; 
                }
            };
        }
    ]);
