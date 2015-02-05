/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

angular.module(
    'eu.water-switch-on.sip.services'
).factory('FilterExpressions',
    ['FilterExpression',
        function (FilterExpression) {
            'use strict';

            var filterExpressions = {};

            Object.defineProperties(filterExpressions, {
                'universalSearchString': {
                    'get': function () {
                        var keys, arrayLength, uss, i, theFilterExpression;
                        keys = Object.keys(this);
                        arrayLength = keys.length;
                        uss = '';
                        for (i = 0; i < arrayLength; i++) {
                            theFilterExpression = this[keys[i]];
                            if (theFilterExpression instanceof FilterExpression && theFilterExpression.isValid()) {
                                if (uss.length === 0) {
                                    uss = theFilterExpression.getFilterExpression();
                                } else {
                                    uss += (' ' + theFilterExpression.getFilterExpression());
                                }
                            }
                        }
                        return uss;
                    },
                    'set': function (param) {
                        console.warn('Attempt to set value of universalSearchString to ' + param
                            + ' is not supported by FilterExpression Class');
                    }
                }
            });

            filterExpressions.clear = function () {
                var keys, arrayLength, i, theFilterExpression;
                keys = Object.keys(this);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = this[keys[i]];
                    if (theFilterExpression instanceof FilterExpression) {
                        theFilterExpression.clear();
                    }
                }
            };

            return filterExpressions;
        }]
    );

