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

            function FilterExpressions() {
                this.list = [];
                this.enumeratedTags = [];
            }

            Object.defineProperties(FilterExpressions.prototype, {
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

            FilterExpressions.prototype.clear = function () {
                var keys, arrayLength, i, theFilterExpression;
                keys = Object.keys(this.list);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = this.list[keys[i]];
                    if (theFilterExpression instanceof FilterExpression) {
                        theFilterExpression.clear();
                    }
                }
                this.enumeratedTags = [];
            };

            FilterExpressions.prototype.addFilterExpression = function (filterExpression) {
                if (filterExpression instanceof FilterExpression) {
                    this.list.push(filterExpression);
                    return true;
                }
                return false;
            };

            FilterExpressions.prototype.removeFilterExpression = function (filterExpression) {
                var removed, i;
                removed = false;
                for (i = this.list.length - 1; i >= 0; i--) {
                    if (this.list[i] === filterExpression) {
                        this.list.splice(i, 1);
                        removed = true;
                    }
                }
                return removed;
            };

            FilterExpressions.prototype.getFilterExpressionsByType = function (type, partialMatch) {
                var i, arrayLength, filterExpressionList;
                filterExpressionList = [];
                arrayLength = this.list.length;
                for (i = 0; i < arrayLength; i++) {
                    if (partialMatch && this.list[i].parameter.indexOf(type) !== -1) {
                        filterExpressionList.push(this.list[i]);
                    } else if (this.list[i].parameter === type) {
                        filterExpressionList.push(this.list[i]);
                    }
                }
                return filterExpressionList;
            };

            FilterExpressions.prototype.enumerateTags = function (includeInvisible, includeInvalid, includeDefaultValue, includeNotFilter) {
                //console.debug("enumerating all tags");
                var arrayLength, i, theFilterExpression, returnTags, theTags;
                returnTags = [];
                arrayLength = this.list.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = this.list[i];

                    if ((!includeInvisible && theFilterExpression.isVisible() === true) &&
                            (!includeInvalid && theFilterExpression.isValid() === true) &&
                            (!includeDefaultValue && theFilterExpression.value !== theFilterExpression.defaultValue) &&
                            (!includeNotFilter && theFilterExpression.isNotFilter() === false)) {

                        theTags = theFilterExpression.enumerateTags();
                        if (theTags.length > 0) {
                            returnTags = returnTags.concat(theTags);
                        }
                    }
                }
                return returnTags;
            };

            return FilterExpressions;
        }]
    );

