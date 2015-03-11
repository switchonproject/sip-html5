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
         * @param {string} parameter  mandatory
         * @param {object} defaultValue  default: undefined
         * @param {boolean} multiple  default: false
         * @param {boolean} visible  default: true
         * @param {string} editor  default: null
         * @param {string} name  default: null
         * @param {string} description default: null
         * @returns {FilterExpression}
         */
        function FilterExpression(parameter, defaultValue, multiple, visible, editor, name, description) {
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
            this.notFilter = (this.parameter.indexOf('!') === 0) ? true : false;
            this.visible = (visible === undefined) ? true : visible;
            this.editor = (editor === undefined) ? null : editor;
            this.name = name;
            this.description = (description === undefined) ? null : description;
            this.enumeratedTags = [];
        }

        // Define the common methods using the prototype
        // and standard prototypal inheritance.  

        /**
         * Returns a display value for a value for this type of filter expression.
         * Commonly, the display value is used as name of the tag of this filter expression.
         * Tags are shown in the Univeral Search Box or the Post Search Filter Box.
         * E.g. getDisplayValue for a GEO Filter Expression whose value is a 
         * WKT String may return the type  of the WKT String,(MULTIPOINT, POLYGON, etc.). 
         * 
         * By default, this method returns a predefined (fixed) display value
         * (if available) or the value itself. Therfore this methos has to be overwritten
         * by filter expressions that need to compute a display value from the actual value
         * (e.g. the GEO Filter Expression).
         * 
         * @param {object} value
         * @returns {string} the computed display value
         */
        FilterExpression.prototype.getDisplayValue = function (value) {
            return this.displayValue || (value === undefined ? this.value : value);
        };
        
        FilterExpression.prototype.getName = function () {
            return this.name ? this.name : this.parameter;
        };

        FilterExpression.prototype.isValid = function () {
            if (this.multiple === true) {
                return (this.value && this.value.constructor === Array && this.value.length > 0);
            }

            return this.value ? true : false;
        };

        /**
         * If a Filter Expression is editable, a custom editor (property: editor) 
         * is shown when the user clicks on the Tag of the Filter Expression.
         * 
         * @returns {Boolean} editable ot not
         */
        FilterExpression.prototype.isEditable = function () {
            return this.editor ? true : false;
        };

        FilterExpression.prototype.isVisible = function () {
            return (this.visible === true) ? true : false;
        };

        FilterExpression.prototype.isNotFilter = function () {
            return (this.notFilter === true) ? true : false;
        };

        FilterExpression.prototype.concatFilter = function (p, v) {
                // post search filters are an array of negated filter expressions
                // e.g. !keyword:"water".
                // therfore it is not necessary to prefix them with param!
                if (p === FilterExpression.FILTER__POST_SEARCH_FILTERS) {
                    return v;
                }
                var concatExpression = (p + ':' + '"' + v + '"');
                return concatExpression;
            };
            
        /**
         * Returns a string that can be used with universal search.
         * If the value of the filter expression is an array, the filter expression
         * string will contain multiple parameter:arraywalue expressions.
         * 
         * @returns {String} universal search string
         */
        FilterExpression.prototype.getFilterExpressionString = function () {
            var filterExpressionString, arrayLength, i;

            if (this.isValid()) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        if (i === 0) {
                            filterExpressionString = this.concatFilter(this.parameter, this.value[i]);
                        } else {
                            filterExpressionString += ' ';
                            filterExpressionString += this.concatFilter(this.parameter, this.value[i]);
                        }
                    }
                } else {
                    filterExpressionString = this.concatFilter(this.parameter, this.value);
                }
            }
            return filterExpressionString;
        };

        /**
         * Adds a new entry to an array if the value of this filter expression 
         * is an array.
         * 
         * @param {type} arrayValue
         * @returns {Boolean}
         */
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

        /**
         * Determines wheter multiple instances of this filter expression can
         * be put into a FilterExpressions list.
         * 
         * @returns {Boolean}
         */
        FilterExpression.prototype.isMultiple = function () {
            return this.multiple === true;
        };

        FilterExpression.prototype.clear = function () {
            if (this.defaultValue !== null && typeof this.defaultValue === 'object') {
                this.value = JSON.parse(JSON.stringify(this.defaultValue));
            } else {
                this.value = this.defaultValue;
            }

            //this.displayValue = null;
            this.enumeratedTags = [];
        };

        /**
         * Enumerates the tags of this filter expression. Returns an array > 1 
         * If the filter expression value is an array
         * @returns {Array} Array of tags
         */
        FilterExpression.prototype.enumerateTags = function () {
            //console.debug("enumerating tags of filter expression '" + this.parameter + "'");
            var tags, i, arrayLength, tag;
            tags = [];

            if (this.isMultiple()) {
                arrayLength = this.value.length;
                for (i = 0; i < arrayLength; i++) {
                    tag = new this.Tag(this, this.value[i]);
                    tags.push(tag);
                }
            } else {
                tag = new this.Tag(this, this.value);
                tags.push(tag);
            }

            return tags;
        };

        /**
         * Tag class for visualising filter expressions as tags.
         * 
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} value
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.Tag = function (filterExpression, value) {
            if (filterExpression === undefined || filterExpression === null) {
                console.error('The filterExpression property of a FilterTag cannot be null!');
                throw 'The filterExpression property of a FilterTag cannot be null!';
            }

            this.origin = filterExpression;
            this.type = this.origin.parameter;
            this.name = this.origin.isMultiple() ? value : this.origin.getDisplayValue(this.origin.value);
            this.value = value;
            this.title = this.origin.name;

            /**
             * Removes the value represtend by this tga from the filter expression.
             * If the value of the filter expression is an array, the entry represented
             * by this tag is removed form the array.
             * 
             * @returns {undefined}
             */
            FilterExpression.prototype.Tag.prototype.remove = function () {
                if (this.origin.isMultiple()) {
                    this.origin.value.splice(this.origin.value.indexOf(this.value), 1);
                } else {
                    this.origin.value = null;
                }
            };

            /**
             * Return the filter expression string of this single tag.
             * 
             * @returns expression for universal search
             */
            FilterExpression.prototype.Tag.prototype.getFilterExpressionString = function () {
                if (this.origin.isMultiple()) {
                    return this.type + ':"' + this.value + '"';
                }

                return this.origin.getFilterExpressionString();
            };
        };

        // define constants
        FilterExpression.FILTER__GEO = 'geo';
        FilterExpression.FILTER__GEO_INTERSECTS = 'geo-intersects';
        FilterExpression.FILTER__GEO_BUFFER = 'geo-buffer';
        FilterExpression.FILTER__KEYWORD = 'keyword';
        FilterExpression.FILTER__KEYWORD_CUAHSI = 'keyword-cuahsi';
        FilterExpression.FILTER__TOPIC = 'topic';
        FilterExpression.FILTER__COLLECTION = 'collection';
        FilterExpression.FILTER__DATE_START = 'fromDate';
        FilterExpression.FILTER__DATE_END = 'toDate';
        FilterExpression.FILTER__OPTION_LIMIT = 'limit';
        FilterExpression.FILTER__OPTION_OFFSET = 'offset';
        FilterExpression.FILTER__TEXT = 'text';
        FilterExpression.FILTER__POST_SEARCH_FILTERS = 'POST_SEARCH_FILTERS';
        FilterExpression.FILTER__ACCESS_CONDITION = 'access-condition';
        FilterExpression.FILTER__FUNCTION = 'function';
        FilterExpression.FILTER__PROTOCOL = 'protocol';

        FilterExpression.FILTERS = [
            FilterExpression.FILTER__GEO,
            FilterExpression.FILTER__GEO_INTERSECTS,
            FilterExpression.FILTER__GEO_BUFFER,
            FilterExpression.FILTER__KEYWORD,
            FilterExpression.FILTER__KEYWORD_CUAHSI,
            FilterExpression.FILTER__TOPIC,
            FilterExpression.FILTER__COLLECTION,
            FilterExpression.FILTER__DATE_START,
            FilterExpression.FILTER__DATE_END,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__OPTION_OFFSET,
            FilterExpression.FILTER__TEXT,
            FilterExpression.FILTER__POST_SEARCH_FILTERS,
            FilterExpression.FILTER__ACCESS_CONDITION,
            FilterExpression.FILTER__FUNCTION,
            FilterExpression.FILTER__PROTOCOL
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

