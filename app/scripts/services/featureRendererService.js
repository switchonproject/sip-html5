angular.module(
    'de.cismet.cids.services'
).factory(
    'de.cismet.cids.services.featureRendererService',
    [
        // would depend on a provider for features, to be specified
        function () {
            'use strict';

            var getFeatureRenderer, wicket, defaultStyle, highlightStyle;

            wicket = new Wkt.Wkt();

            defaultStyle = {color: '#0000FF', fill: false, weight: 2, riseOnHover: true, clickable: false};
            highlightStyle = {fillOpacity: 0.4, fill: true, fillColor: '#1589FF', riseOnHover: true, clickable: false};

            /**
             * Returns a "Feature Renderer" (Leaflet Layer) for a resource.
             * If the resources contains a WMS preview representation a WMS Layer
             * is instantiated and returned, otherwise, the spatialextent (geom)
             * of the resourc eis used.
             *
             * @param {type} obj
             * @returns {L.TileLayer.WMS|featureRendererService_L7.getFeatureRenderer.renderer}
             */
            getFeatureRenderer = function (obj) {
                // this is only an indirection to hide the conrete implementation
                // however, as not specified yet, we hardcode this for now

                var ewkt, renderer, objectStyle;

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
                                    representation.protocol) {

                                // PRIORITY on TMS!
                                if (representation.protocol.name === 'WWW:TILESERVER') {
                                    renderer = L.tileLayer(representation.contentlocation,
                                        {
                                            // FIXME: make configurable per layer
                                            tms: 'true'
                                        });

                                    // unfortunately leaflet does not parse the capabilities, etc, thus no bounds present :(
                                    // todo: resolve performance problems with multipoint / multipolygon!
                                    renderer.getBounds = function () {
                                        // the geo_field property comes from the server so ...  
                                        if (obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                                            ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                                            wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));

                                            return wicket.toObject().getBounds();
                                        }
                                    };

                                    // disable the layer by default and show it only when it is selected!
                                    renderer.setOpacity(0.0);
                                    //renderer.bringToBack();
                                } else if (representation.protocol.name === 'OGC:WMS-1.1.1-http-get-capabilities') {
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
                                    // todo: resolve performance problems with multipoint / multipolygon!
                                    renderer.getBounds = function () {
                                        // the geo_field property comes from the server so ...  
                                        if (obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                                            ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                                            wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));

                                            return wicket.toObject().getBounds();
                                        }
                                    };

                                    // disable the layer by default and show it only when it is selected!
                                    renderer.setOpacity(0.0);
                                    renderer.bringToBack();
                                }
                            }

                            // execute callback function until renderer is found 
                            return renderer === null;
                        });
                    }

                    // the geo_field property comes from the server so ...  
                    // if no preview (WMS layer representation) is found,
                    // use the spatial extent
                    if (!renderer && obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                        ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                        wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));
                        objectStyle = Object.create(defaultStyle);
                        if (obj.name) {
                            objectStyle.title = obj.name;
                        }
                        renderer = wicket.toObject(objectStyle);
                        renderer.setStyle(defaultStyle);
                    }
                }

                return renderer;
            };

            return {
                getFeatureRenderer: getFeatureRenderer,
                defaultStyle: defaultStyle,
                highlightStyle: highlightStyle
            };
        }
    ]
);