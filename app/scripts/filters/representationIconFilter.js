/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

angular.module('eu.water-switch-on.sip.filters').
        filter('representationIcon', function () {
            'use strict';
            return function (protocol) {
                switch (protocol) {
                    case 'OGC:WMS-1.1.1-http-get-capabilities':
                    case 'OGC:WFS-1.0.0-http-get-capabilities':
                        return 'glyphicon-list-alt';    
                    case 'OGC:WFS-1.0.0-http-get-feature':
                        return 'glyphicon-star-empty';
                    case 'OGC:WMS-1.1.1-http-get-map':
                    case 'WWW:TILESERVER':
                        return 'glyphicon-th';   
                    case 'OPeNDAP:OPeNDAP':
                        return 'glyphicon-align-justify';     
                    default:
                        return 'glyphicon-download-alt';
                }
            };
        }
        );