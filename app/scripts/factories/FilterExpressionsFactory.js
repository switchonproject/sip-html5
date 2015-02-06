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
            filterExpressions.map = {};

            Object.defineProperties(filterExpressions, {
                'universalSearchString': {
                    'get': function () {
                        var keys, arrayLength, uss, i, theFilterExpression;
                        keys = Object.keys(this.map); 
                        arrayLength = keys.length;
                        uss = '';
                        for (i = 0; i < arrayLength; i++) {
                            theFilterExpression = this.map[keys[i]];
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
                keys = Object.keys(filterExpressions.map);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = filterExpressions.map[keys[i]];
                    if (theFilterExpression instanceof FilterExpression) {
                        theFilterExpression.clear();
                    }
                }
            };
            
            filterExpressions.addFilterExpression = function (key, value) {
                if(!filterExpressions.map[key] && value instanceof FilterExpression) {
                    filterExpressions.map[key] = value;
                    return true;
                }
                return false;
            };
            
            filterExpressions.removeFilterExpression = function (key) {
                
                return delete filterExpressions.map[key];
            };
            
            filterExpressions.getFilterExpression = function (key) {
                
                return filterExpressions.map[key];
            };
            
            filterExpressions.enumerateFilterExpressions = function () {
                var filterExpressionArray = Object.keys(filterExpressions.map).map(function (key) {
                    return filterExpressions.map[key];
                });
                return filterExpressionArray;
            };
            
            filterExpressions.enumerateTags  = function () {
                var keys, arrayLength, i, theFilterExpression, tags;
                tags = [];
                keys = Object.keys(filterExpressions.map);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = filterExpressions.map[keys[i]];
                    var theTags = theFilterExpression.enumerateTags();
                    if(theTags.length > 0) {
                        tags.concat(theTags);
                        //return theTags;
                        tags = theTags;
                    }
                    
                }

                return tags;
            };
            
            return filterExpressions;
        }]
    );

