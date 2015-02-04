angular.module(
    'de.cismet.cids.services'
).factory(
    'de.cismet.cids.services.featureRendererService',
    [
        // would depend on a provider for features, to be specified
        function () {
            'use strict';

            var getFeatureRenderer, wicket;

            wicket = new Wkt.Wkt();

            getFeatureRenderer = function (obj) {
                // this is only an indirection to hide the conrete implementation
                // however, as not specified yet, we hardcode this for now

                var ewkt, renderer;

                renderer = null;
                if (obj &&
                        obj.$self &&
                        obj.$self.substr(0, 18).toLowerCase() === '/switchon.resource' &&
                        obj.spatialcoverage &&            // this property comes from the server so ...  
                        obj.spatialcoverage.geo_field) {  // jshint ignore:line
                    ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                    wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));
                    renderer = wicket.toObject({color: '#000000', fill: false, weight: 1});
                }

                return renderer;
            };

            return {
                getFeatureRenderer: getFeatureRenderer
            };
        }
    ]
);