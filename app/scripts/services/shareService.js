angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.shareService',
    [
        function () {
            'use strict';

            var resourceObjects;

            return {
                // TODO: move the functions to the body if they get more complex
                // TODO: consider event on set
                getResourceObjects: function () { return resourceObjects; },
                setResourceObjects: function (objs) { resourceObjects = objs; }
            };
        }
    ]
);