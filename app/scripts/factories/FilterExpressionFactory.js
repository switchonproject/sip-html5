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
            this.multiple = (multiple === true) ? true : false;

            // if this multiple, create an empty array
            // if default value is an object it has to be cloned!
            this.value = (defaultValue === undefined) ? (this.multiple ? [] : null) :
                    ((this.defaultValue !== null && typeof this.defaultValue === 'object') ?
                            JSON.parse(JSON.stringify(this.defaultValue)) : this.defaultValue);
            this.name = (name === undefined) ? null : name;

            if (!this.name && this.multiple) {
                throw 'For the array-type filter expression "' + parameter + '", the name parameter is mandatory!';
            }

            this.notFilter = (this.parameter.indexOf('!') === 0) ? true : false;
            this.visible = (visible === undefined) ? true : visible;
            this.editor = (editor === undefined) ? null : editor;
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
         * By default, this method returns value parameter (if not null od undefined) 
         * or a predefined (fixed) display value (if available) or as last fallback 
         * the value of the filter expression (which might be an array!). 
         * Therefore this method has to be overwritten by filter expressions that 
         * need to compute a display value from the actual value
         * (e.g. the GEO Filter Expression) or from an array value.
         * 
         * A collection tag, that is a tag that represents a whole array-type filter expression,
         * sets the pratemrter value to null. Therfore, the property name is mandatory
         * for such a filter expression.
         * 
         * @param {object} value
         * @returns {string} the computed display value
         */
        FilterExpression.prototype.getDisplayValue = function (value) {
            return value || (this.getName() || this.value);
        };

        FilterExpression.prototype.getName = function () {
            return this.name || this.parameter;
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

        /**
         * This is a helper method that implements special treatment for post 
         * search filters expressions. For non post search filters expressions 
         * it returns a filter expression string formatted as parameter:value, 
         * for post search filters expressions is just return the ()array value 
         * of the post search filters expression that is itself a (negated)
         * filter expression (e.g. !keyword:"water")!
         * 
         * @param {type} parameter
         * @param {type} value
         * @returns {String}
         */
        FilterExpression.prototype.concatFilter = function (parameter, value) {
            // post search filters are an array of negated filter expressions
            // e.g. !keyword:"water".
            // therfore it is not necessary to prefix them with param!
            if (parameter === FilterExpression.FILTER__POST_SEARCH_FILTERS) {
                return value;
            }
            var concatExpression = (parameter + ':' + '"' + value + '"');
            return concatExpression;
        };

        /**
         * Returns a filter expression string that can be used with universal search.
         * If the value of the filter expression is an array, the filter expression
         * string will contain multiple parameter:array-value expressions.
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
                            filterExpressionString = this.concatFilter(this.parameter, this.getArrayValue(i));
                        } else {
                            filterExpressionString += ' ';
                            filterExpressionString += this.concatFilter(this.parameter, this.getArrayValue(i));
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
         * is an array. If the value already exists, it is not added.
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
         * Returns the entry at the specified index if the value of this
         * filter expression is an array. Array values of filter expressions
         * should be strings! This method can be overwitten in case the array value
         * of the expression is an object. It should then return a string representation
         * of the object that can serve as input for e.g. the getFilterExpressionString()
         * method.
         * 
         * @param {int} index
         * @returns {string}
         */
        FilterExpression.prototype.getArrayValue = function (index) {
            if (this.isMultiple()) {
                if (!this.value || index >= this.value.length) {
                    return null;
                }

                return this.value[index];
            }

            return this.value;
        };

        /**
         * Determines the cardinality of a specific tag. This method is used
         * to display the number of tags of a collection tag or the number of
         * objects associated with a post search filter tag. In the later case, 
         * this operation has to be overwritten.
         * 
         * @param {type} index
         * @returns {Array|window.JSON.parse.j|JSON.parse.j|Object|object}
         */
        FilterExpression.prototype.getCardinality = function (index) {
            var cardinality;

            if (index === -1) {
                // no array item OR collection tag
                cardinality = (this.value && this.isMultiple()) ? this.value.length : 0;
            } else {
                // index is ignored in the default implementation.
                // if cardinality of a single array item matters, 
                // this operation has to be overwritten!
                cardinality = 0;
            }

            return cardinality;
        };

        /**
         * Determines wheter the value of this filter expression is an array
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

            this.enumeratedTags = [];
        };

        /**
         * Enumerates the tags of this filter expression. Returns an array > 1 
         * if the filter expression value is an array, otherwise behaves exactly as getTag().
         * 
         * Attention, this method does not check tags for validity!
         * 
         * @returns {Array} Array of tags
         */
        FilterExpression.prototype.enumerateTags = function () {
            //console.debug("enumerating tags of filter expression '" + this.parameter + "'");
            var tags, i, arrayLength, tag;
            tags = [];

            if (this.isMultiple()) {
                arrayLength = this.value.length;
                for (i = 0; i < arrayLength; i++) {
                    tag = new this.Tag(this, this.getArrayValue(i), this.getCardinality(i), false);
                    tags.push(tag);
                }
            } else {
                tag = new this.Tag(this, this.value, this.getCardinality(-1), false);
                tags.push(tag);
            }

            return tags;
        };

        /**
         * Returns excactly one tag that represents this filter expression whether  
         * it is an array-type (isMultiple = true) filter expression or not. 
         * 
         * Attention, this method does not check tags for validity!
         * 
         * @returns {this.Tag}
         */
        FilterExpression.prototype.getTag = function () {
            var tag, cardinality;
            cardinality = this.getCardinality(-1);
            tag = new this.Tag(this, this.value, cardinality, true);
            return tag;
        };

        /**
         * Tag class for visualising filter expressions as tags.
         * 
         * Cardinality and value of an array-type tags cannot be determined by the
         * index of the tag in the filter expression value array, since the tag's remove
         * function can change the array length and thus the index. Therefore,
         * the values have to be provided when the tag is constructed!
         * 
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} value
         * @param {int} cardinality
         * @param {boolean} collectionTag
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.Tag = function (filterExpression, value, cardinality, collectionTag) {
            if (filterExpression === undefined || filterExpression === null) {
                console.error('The filterExpression property of a FilterTag cannot be null!');
                throw 'The filterExpression property of a FilterTag cannot be null!';
            }

            this.origin = filterExpression;
            this.type = this.origin.parameter;
            this.cardinality = cardinality || 0;

            /**
             * Determines wheter this tag is the representative of the value of the filter
             * expression or just a single entry in an array value. In this case, value must be an array.
             */
            this.collectionTag = collectionTag === true ? true : false;

                        /**
             * The value is needed in case the Tag is created from an array
             */
            this.value = value;

            FilterExpression.prototype.Tag.prototype.getName = function () {
                return this.origin.getName();
            };

            FilterExpression.prototype.Tag.prototype.isEditable = function () {
                return this.origin.isEditable();
            };

            FilterExpression.prototype.Tag.prototype.getValue = function () {
                return this.value;
            };

            /**
             * If the tag is a collection tag (it represnts the whole filter expression
             * whose value is an array), the displayed tag name shall be determined by 
             * the name property of the filter expression (default implementation
             * of getDisplayValue). Otherwise, the tag name is determined on basis of
             * the (array)value of the filter expression, e.g. by a cumstom implementation
             * of the getDisplayValue operation.
             */
            FilterExpression.prototype.Tag.prototype.getDisplayValue = function (value) {
                return collectionTag ? this.name :
                        (value ? this.origin.getDisplayValue(value) : this.origin.getDisplayValue(this.value));
            };

            /**
             * Removes the value represented by this tag from the filter expression.
             * If the value of the filter expression is an array, the entry represented
             * by this tag is removed from the array unless this tag is explicitely
             * marked as collection tag that represents the entire filter expression.
             * 
             * @returns {undefined}
             */
            FilterExpression.prototype.Tag.prototype.remove = function () {
                if (!this.collectionTag && this.origin.isMultiple()) {
                    this.origin.value.splice(this.origin.value.indexOf(this.value), 1);
                } else {
                    this.origin.value = null;
                }
            };

            /**
             * Returns the filter expression string of a single array value or 
             * the entire filter expression if the filter expression is either not
             * an array type or this tag represents the collectionn tag of the 
             * filter expression.
             * 
             * @returns expression for universal search
             */
            FilterExpression.prototype.Tag.prototype.getFilterExpressionString = function () {
                if (!this.collectionTag && this.origin.isMultiple()) {
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

