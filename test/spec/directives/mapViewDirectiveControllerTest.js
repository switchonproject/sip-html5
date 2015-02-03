describe('Map View Directive Test Suite', function () {
    'use strict';

    describe('Map View Directive Controller Tests', function () {
        var $controller, $rootScope, $timeout, $window, leafletData,
            ctrl, scope;

        beforeEach(function () {
            module('eu.water-switch-on.sip.controllers');
            module('de.cismet.cids.services');
            module('leaflet-directive');
        });

        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                '$window',
                '$timeout',
                'leafletData',
                function (controller, rootscope, window, timeout, leaflet) {
                    $controller = controller;
                    $rootScope = rootscope;
                    $window = window;
                    $timeout = timeout;
                    leafletData = leaflet;
                }
            ]
        ));

        beforeEach(function () {
            scope = $rootScope.$new(true);
            ctrl = $controller(
                'eu.water-switch-on.sip.controllers.mapViewDirectiveController',
                {
                    $scope: scope,
                    $window: $window,
                    $timeout: $timeout,
                    leafletData: leafletData
                }
            );
            scope.$digest();
        });

        it('ignore illegal wkt', function () {
            scope.searchGeomWkt = null;
            scope.$digest();
            expect(scope.searchGeomLayer).toBeUndefined();

            scope.searchGeomWkt = '';
            scope.$digest();
            expect(scope.searchGeomLayer).toBeUndefined();

            scope.searchGeomWkt = 'POINT(1,1)';
            scope.$digest();
            expect(scope.searchGeomLayer).toBeUndefined();
        });

        it('proper layer from wkt', function () {
            scope.searchGeomWkt = 'POLYGON(1 1, 1 2, 2 2, 2 1, 1 1)';
            scope.$digest();

            expect(scope.searchGeomLayer).not.toBeUndefined();
            expect(scope.searchGeomLayer.getBounds()).not.toBeUndefined();
        });

        it('proper wkt from layer', function () {
            var wicket, wkt;

            wkt = 'POLYGON((1 1,1 2,2 2,2 1,1 1))';
            wicket = new Wkt.Wkt();
            wicket.read(wkt);
            scope.searchGeomLayer = wicket.toObject();
            scope.$digest();

            expect(scope.searchGeomWkt).toEqual(wkt);
        });
    });
});