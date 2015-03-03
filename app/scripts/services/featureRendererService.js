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
                        obj.$self.substr(0, 18).toLowerCase() === '/switchon.resource') {
                    if (obj.representation) {
                        obj.representation.every(function (representation) {
                            var capabilities, layername;

                            if (representation.name && representation.contentlocation &&
                                    representation.type && representation.type.name === 'aggregated data' &&
                                    representation['function'] && representation['function'].name === 'service' &&
                                    representation.protocol && representation.protocol.name === 'OGC:WMS-1.1.1-http-get-capabilities') {
                                capabilities = representation.contentlocation;
                                layername = representation.name;
                                renderer = L.tileLayer.wms(
                                    capabilities,
                                    {
                                        layers: layername,
                                        format: 'image/png',
                                        transparent: true,
                                        version: '1.1.1'
                                    }
                                );

                                // unfortunately leaflet does not parse the capabilities, etc, thus no bounds present :(
                                renderer.getBounds = function () {
                                    // the geo_field property comes from the server so ...  
                                    if (obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                                        ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                                        wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));

                                        return wicket.toObject().getBounds();
                                    }
                                };
                            }

                            return renderer === null;
                        });
                    }

                    // the geo_field property comes from the server so ...  
                    if (!renderer && obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                        ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                        wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));
                        renderer = wicket.toObject({color: '#000000', fill: false, weight: 1});
                    }
                }

                return renderer;
            };

            return {
                getFeatureRenderer: getFeatureRenderer
            };
        }
    ]
);