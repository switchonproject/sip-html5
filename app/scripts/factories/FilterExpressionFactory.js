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

        /**
         * @constructor
         * @param {string} parameter
         * @param {object} defaultValue
         * @param {boolean} multiple
         * @param {boolean} visible
         * @param {string} editor
         * @returns {FilterExpression}
         */
        function FilterExpression(parameter, defaultValue, multiple, visible, editor) {
            if (parameter === undefined || parameter === null) {
                throw 'The parameter property of a FilterExpression cannot be null!';
            }
            this.parameter = parameter;
            this.defaultValue = (defaultValue === undefined) ? null : defaultValue;
            // if default value is an object it has to be cloned!
            this.value = (defaultValue === undefined) ? null :
                    ((this.defaultValue !== null && typeof this.defaultValue === 'object') ?
                            JSON.parse(JSON.stringify(this.defaultValue)) : this.defaultValue);
            this.displayValue = null;
            this.multiple = (multiple === undefined) ? false : multiple;
            this.visible = (visible === undefined) ? true : visible;
            this.editor = (editor === undefined) ? null : editor;
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

        FilterExpression.prototype.isEditable = function () {
            return this.editor ? true : false;
        };

        FilterExpression.prototype.isVisible = function () {
            return (this.visible === true) ? true : false;
        };

        FilterExpression.prototype.getFilterExpressionString = function () {
            var filterExpressionString, arrayLength, i, concatFilter;

            concatFilter = function (parameter, value) {
                var concatExpression = (parameter + ':' + '"' + value + '"');
                return concatExpression;
            };

            if (this.isValid()) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        if (i === 0) {
                            filterExpressionString = concatFilter(this.parameter, this.value[i]);
                        } else {
                            filterExpressionString += ' ';
                            filterExpressionString += concatFilter(this.parameter, this.value[i]);
                        }
                    }
                } else {
                    filterExpressionString = concatFilter(this.parameter, this.value);
                }
            }
            return filterExpressionString;
        };

        FilterExpression.prototype.setArrayValue = function (arrayValue) {
            if (this.isMultiple()) {
                if (!this.value) {
                    this.value = [];
                }

                if (this.value.indexOf(arrayValue) === -1) {
                    this.value.push(arrayValue);
                    return true;
                }
            }

            return false;
        };

        FilterExpression.prototype.isMultiple = function () {
            return this.multiple === true;
        };

        FilterExpression.prototype.clear = function () {
            if (this.defaultValue !== null && typeof this.defaultValue === 'object') {
                this.value = JSON.parse(JSON.stringify(this.defaultValue));
            } else {
                this.value = this.defaultValue;
            }

            this.displayValue = null;
        };

        FilterExpression.prototype.enumerateTags = function () {
            var tags, i, arrayLength, tag;
            tags = [];

            if (this.isVisible() === true && this.isValid() === true && this.value !== this.defaultValue) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        tag = new this.Tag(this, this.value[i]);
                        tags.push(tag);
                    }
                } else {
                    tag = new this.Tag(this);
                    tags.push(tag);
                }
            }

            return tags;
        };

        /**
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} arrayValue
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.Tag = function (filterExpression, arrayValue) {
            if (filterExpression === undefined || filterExpression === null) {
                console.error('The filterExpression property of a FilterTag cannot be null!');
                throw 'The filterExpression property of a FilterTag cannot be null!';
            }

            this.origin = filterExpression;
            this.type = this.origin.parameter;
            this.name = this.origin.isMultiple() ? arrayValue : this.origin.getDisplayValue();
            this.arrayValue = arrayValue;

            FilterExpression.prototype.Tag.prototype.remove = function () {
                if (this.origin.isMultiple()) {
                    this.origin.value.splice(this.origin.value.indexOf(this.arrayValue), 1);
                } else {
                    this.origin.value = null;
                }
            };

            FilterExpression.prototype.Tag.prototype.getFilterExpressionString = function () {
                if (this.origin.isMultiple()) {
                    console.log(this.type + ':"' + this.arrayValue + '"');
                    return this.type + ':"' + this.arrayValue + '"';
                }

                return this.origin.getFilterExpressionString();
            };
        };

        // define constants
        FilterExpression.RENDERER__TO_STRING = 'renderer_tostring';

        FilterExpression.FILTER__GEO = 'geo';
        FilterExpression.FILTER__GEO_INTERSECTS = 'geo-intersects';
        FilterExpression.FILTER__GEO_BUFFER = 'geo-buffer';
        FilterExpression.FILTER__KEYWORD = 'keyword';
        FilterExpression.FILTER__KEYWORD_CUAHSI = 'keyword-cuahsi';
        FilterExpression.FILTER__TOPIC = 'topic';
        FilterExpression.FILTER__CATEGORY = 'category';
        FilterExpression.FILTER__DATE_START = 'fromDate';
        FilterExpression.FILTER__DATE_END = 'toDate';
        FilterExpression.FILTER__OPTION_LIMIT = 'limit';
        FilterExpression.FILTER__TEXT = 'text';

        FilterExpression.FILTERS = [
            FilterExpression.FILTER__GEO,
            FilterExpression.FILTER__GEO_INTERSECTS,
            FilterExpression.FILTER__GEO_BUFFER,
            FilterExpression.FILTER__KEYWORD,
            FilterExpression.FILTER__KEYWORD_CUAHSI,
            FilterExpression.FILTER__TOPIC,
            FilterExpression.FILTER__CATEGORY,
            FilterExpression.FILTER__DATE_START,
            FilterExpression.FILTER__DATE_END,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__TEXT
        ];

        Object.defineProperties(FilterExpression.prototype, {
            'valid': {
                'get': function () {
                    return this.isValid();
                }
            }
        });

        return FilterExpression;
    }]);

