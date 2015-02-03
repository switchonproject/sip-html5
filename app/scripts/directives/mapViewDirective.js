angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'mapView',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/map-view-directive.html',
                scope: {
                    searchGeomWkt: '=',
                    centerSearchGeometry: '=',
                    preserveZoomOnCenter: '=',
                    objects: '=',
                    centerObjects: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.mapViewDirectiveController'
            };
        }
    ]
);