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
            filterExpressions.list = [];

            Object.defineProperties(filterExpressions, {
                'universalSearchString': {
                    'get': function () {
                        var keys, arrayLength, uss, i, theFilterExpression;
                        keys = Object.keys(this.list);
                        arrayLength = keys.length;
                        uss = '';
                        for (i = 0; i < arrayLength; i++) {
                            theFilterExpression = this.list[keys[i]];
                            if (theFilterExpression instanceof FilterExpression && theFilterExpression.isValid()) {
                                if (uss.length === 0) {
                                    uss = theFilterExpression.getFilterExpressionString();
                                } else {
                                    uss += (' ' + theFilterExpression.getFilterExpressionString());
                                }
                            }
                        }
                        return uss;
                    },
                    'set': function (param) {
                        console.warn('Attempt to set value of universalSearchString to ' + param + ' is not supported by FilterExpression Class');
                    }
                }
            });

            filterExpressions.clear = function () {
                var keys, arrayLength, i, theFilterExpression;
                keys = Object.keys(filterExpressions.list);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = filterExpressions.list[keys[i]];
                    if (theFilterExpression instanceof FilterExpression) {
                        theFilterExpression.clear();
                    }
                }
            };

            filterExpressions.addFilterExpression = function (filterExpression) {
                if (filterExpression instanceof FilterExpression) {
                    filterExpressions.list.push(filterExpression);
                    return true;
                }
                return false;
            };

            filterExpressions.removeFilterExpression = function (filterExpression) {
                var removed, i;
                removed = false;
                for (i = filterExpressions.list.length - 1; i >= 0; i--) {
                    if (filterExpressions.list[i] === filterExpression) {
                        filterExpressions.list.splice(i, 1);
                        removed = true;
                    }
                }
                return removed;
            };

            filterExpressions.getFilterExpressionsByType = function (type, partialMatch) {
                var i, arrayLength, filterExpressionList;
                filterExpressionList = [];
                arrayLength = filterExpressions.list.length;
                for (i = 0; i < arrayLength; i++) {
                    if (partialMatch && filterExpressions.list[i].parameter.indexOf(type) !== -1) {
                        filterExpressionList.push(filterExpressions.list[i]);
                    } else if (filterExpressions.list[i].parameter === type) {
                        filterExpressionList.push(filterExpressions.list[i]);
                    }
                }
                return filterExpressionList;
            };

            filterExpressions.enumerateTags  = function () {
                var arrayLength, i, theFilterExpression, returnTags, theTags;
                returnTags = [];
                arrayLength = filterExpressions.list.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = filterExpressions.list[i];
                    theTags = theFilterExpression.enumerateTags();
                    if (theTags.length > 0) {
                        returnTags = returnTags.concat(theTags);
                    }
                }
                return returnTags;
            };

            return filterExpressions;
        }]
    );

