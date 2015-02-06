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
    'eu.water-switch-on.sip.factories'
).factory('FilterExpression',
    [function () {
        'use strict';

        // Define the constructor function.
        function FilterExpression(parameter, defaultValue, multiple, renderer) {
            if (parameter === undefined || parameter === null) {
                throw 'The parameter property of a FilterExpression cannot be null!';
            }
            this.parameter = parameter;
            this.defaultValue = (defaultValue === undefined) ? null : defaultValue;
            this.value = (defaultValue === undefined) ? null : defaultValue;
            this.displayValue = null;
            this.multiple = (multiple === undefined) ? false : multiple;
            this.renderer = (renderer === undefined) ? this.RENDERER__TO_STRING : renderer;
        }

        // Define the common methods using the prototype
        // and standard prototypal inheritance.  
        FilterExpression.prototype.getDisplayValue = function () {
            return this.displayValue || this.value;
        };

        FilterExpression.prototype.isValid = function () {
            if (this.multiple === true) {
                return (this.value && this.value.constructor === Array && this.value.length > 0);
            }

            return this.value ? true : false;
        };

        FilterExpression.prototype.getFilterExpression = function () {
            var filterExpression, arrayLength, i, concatFilter;

            concatFilter = function (parameter, value) {
                var concatExpression = (parameter + ':' + '"' + value + '"');
                return concatExpression;
            };

            if (this.isValid()) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        if (i === 0) {
                            filterExpression = concatFilter(this.parameter, this.value[i]);
                        } else {
                            filterExpression += ' ';
                            filterExpression += concatFilter(this.parameter, this.value[i]);
                        }
                    }
                } else {
                    filterExpression = concatFilter(this.parameter, this.value);
                }
            }
            return filterExpression;
        };

        FilterExpression.prototype.isMultiple = function () {
            return this.multiple === true;
        };

        FilterExpression.prototype.clear = function () {
            this.value = this.defaultValue;
            this.displayValue = null;
        };

        FilterExpression.prototype.enumerateTags = function () {
            var tags, i, arrayLength, tag;
            tags = [];

            function removeTag() {
                return function () {
                    tag.origin.value.splice(tag.index, 1);
                };
            }

            if (this.isValid() && this.value !== this.defaultValue) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        tag = {};
                        tag.name = this.value[i];
                        tag.type = this.parameter;
                        tag.origin = this;
                        tag.index = i;
                        tag.remove = removeTag();
                        tags.push(tag);
                    }
                } else {
                    tag = {};
                    tag.name = this.getDisplayValue();
                    tag.type = this.parameter;
                    tag.origin = this;
                    tag.remove = removeTag();
                    tags.push(tag);
                }
            }

            return tags;
        };

        // define constants
        FilterExpression.RENDERER__TO_STRING = 'renderer_tostring';

        Object.defineProperties(FilterExpression.prototype, {
            'valid': {
                'get': function () {
                    return this.isValid();
                }
            }
        });

        return FilterExpression;
    }]);

