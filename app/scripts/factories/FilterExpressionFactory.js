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
            // visible defaults to true!
            this.visible = (visible === undefined) ? true : visible;
            // set a default editor for array-type filter expression only if no editor is provided.
            this.editor = editor || (this.multiple === true ? 'templates/filter-expression-editor-popup.html' : null);
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
            // therefore it is not necessary to prefix them with param!
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
         * of the expression is an object.
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
         * Determines wheter the value of this filter expression is an array
         * 
         * @returns {Boolean}
         */
        FilterExpression.prototype.isMultiple = function () {
            return this.multiple === true;
        };

        /**
         * Resets the value of this filter expression to a default value (or null);
         * 
         * @returns {undefined}
         */
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
         * If postFilterTags is true, instances of PostFilterTag are created.  
         * 
         * Attention, this method does not check tags for validity!
         * 
         * @param {boolean} postFilterTags
         * @returns {Array} Array of tags
         */

        FilterExpression.prototype.enumerateTags = function (postFilterTags) {
            var tags, i, arrayLength, tag;
            tags = [];

            // create a new tag for each item in the array
            if (this.isMultiple()) {
                arrayLength = this.value.length;
                for (i = 0; i < arrayLength; i++) {
                    if (postFilterTags === true) {
                        tag = new this.PostFilterTag(this, this.getArrayValue(i));
                    } else {
                        tag = new this.Tag(this, this.getArrayValue(i));
                    }

                    tags.push(tag);
                }
            } else {
                if (postFilterTags === true) {
                    throw 'error enumerating post filter tags for filter expression "' + this.parameter +
                        '", Post Filter Tags can only be enumerated for array-type filter expressions!';
                }

                tag = new this.Tag(this, this.value);
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
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.getTag = function () {
            var tag;

            // return collection tags if there is more than 1 value in the collection!
            if (this.isMultiple()) {
                if (this.value && this.value.length === 1) {
                    tag = new this.Tag(this, this.value[0]);
                } else {
                    tag = new this.CollectionTag(this, this.value);
                }
            } else {
                tag = new this.Tag(this, this.value);
            }

            return tag;
        };

        /**
         * Sets the value of a filter expression from a string. This method
         * is commonly called when a universal search string is parsed
         * in the universal search box. It has to be overriden by individual 
         * filter expression to perorma additional parsing of value string,
         * e.g. converting to numbers.
         * 
         * 
         * @param {string} newValue
         * @returns {undefined}
         */
        FilterExpression.prototype.setStringValue = function (newValue) {
            if (this.isMultiple()) {
                this.setArrayValue(newValue);
            } else {
                this.value = newValue;
            }
        };

        /**
         * Returns th ename of the filter expression.
         * 
         * @returns {String} name
         */
        FilterExpression.prototype.getName = function () {
            return this.name || this.parameter;
        };

        /**
         * Tag base class for visualising filter expressions as tags.
         * 
         * The value of array-type tags cannot be determined by the
         * index of the tag in the filter expression value array, since the tag's remove
         * function can change the array length and thus the index. Therefore,
         * the values have to be provided when the tag is constructed!
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

            /**
             * The origin filter expression of this tag.
             * @type FilterExpression
             */
            this.origin = filterExpression;

            /**
             * The value is needed in case the Tag is created from an array
             */
            this.value = value;
        };

        FilterExpression.prototype.Tag.constructor = FilterExpression.prototype.Tag;

        /**
         * Returns the title of the tag, commonly for showing tooltips.
         * 
         * @returns {string} title of the tag
         */
        FilterExpression.prototype.Tag.prototype.getTitle = function () {
            return this.origin.getName();
        };

        /**
         * Return the type of the tag and its origin filter expression, respectively.
         * 
         * @returns {string} type of the tag
         */
        FilterExpression.prototype.Tag.prototype.getType = function () {
            return this.origin.parameter;
        };

        /**
         * If a Filter Expression is editable, a custom editor (property: editor) 
         * is shown when the user clicks on the Tag of the Filter Expression. 
         * Array-type filter expression are only editable as a whole, therefore
         * this method returns false by default.
         * 
         * @returns {Boolean} editable ot not
         */
        FilterExpression.prototype.Tag.prototype.isEditable = function () {
            return this.origin.isMultiple() ? false : (this.origin.editor ? true : false);
        };

        /**
         * Returns the editor template url for editing this tag.
         * 
         * @returns {string} editor template
         */
        FilterExpression.prototype.Tag.prototype.getEditor = function () {
            return this.origin.editor;
        };

        /**
         * Determines wheter this tag  is removeable or not. This is mainly
         * relevant for post search filter expressions where for example
         * negated filter expressions that don't yield any result shall not be removeable.
         * Likewise, this method is overwritten by post search filter tags.
         * 
         * @returns {boolean} removeable or not (default: true)
         */
        FilterExpression.prototype.Tag.prototype.isRemoveable = function () {
            return true;
        };

        /**
         * Returns the value associated with this tag. 
         * If the origin filter expression is multiple, the value is an array element
         * of the filter expression's value. However, if the tag is a collection tag,
         * the value is the origin filter expression's original  value 
         * (thus, it might be an array).
         * 
         * @returns {object} value associated with the tag
         */
        FilterExpression.prototype.Tag.prototype.getValue = function () {
            return this.value;
        };

        /**
         * If the tag is a collection tag (it represents the whole filter expression
         * whose value is an array), the displayed tag name shall be determined by 
         * the name property of the filter expression (default implementation
         * of getDisplayValue). Otherwise, the tag name is determined on basis of
         * the (array)value of the filter expression, e.g. by a custom implementation
         * of the getDisplayValue operation.
         * 
         * This operation is delegated to the origon filter expressions  getDisplayValue
         * operation in order to support a per-filter-expression type methods for
         * generate display values.
         * 
         * The optional value parameter can be used to display a value that is different 
         * from the actual value stored in the tag and the filter expression, respectively.
         * This is mainly useful for editors that do not want to change actual value 
         * before the user confirms the change.
         * 
         * @param {string} value that is displayed
         * @returns {string}
         */
        FilterExpression.prototype.Tag.prototype.getDisplayValue = function (value) {
            return (value ? this.origin.getDisplayValue(value) : this.origin.getDisplayValue(this.getValue()));
        };

        /**
         * Determines the cardinality of a specific tag. This method is used
         * to display the number of tags of a collection tag or the number of
         * objects associated with a post search filter tag. In the later cases, 
         * this operation has to be overwritten. Returns 0 by default. 
         * 
         * @returns {int} cardinality of the tag
         */
        FilterExpression.prototype.Tag.prototype.getCardinality = function () {
            return 0;
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
            if (this.origin.isMultiple()) {
                var index;
                index = this.origin.value.indexOf(this.value);
                if (index !== -1) {
                    this.origin.value.splice(index, 1);
                }
            } else {
                this.origin.value = null;
            }

            // invoke the callback function
            if (this.origin.removeCallBack) {
                this.origin.removeCallBack(this);
            }
        };

        /**
         * Returns the filter expression string of a single array value or 
         * the entire filter expression if the filter expression is either not
         * an array type or this tag represents the collection tag of the 
         * filter expression.
         * 
         * @returns expression for universal search
         */
        FilterExpression.prototype.Tag.prototype.getFilterExpressionString = function () {
            if (this.origin.isMultiple()) {
                return this.getType() + ':"' + this.getValue() + '"';
            }

            return this.origin.getFilterExpressionString();
        };


        /**
         * Collection Tag for visualising (array-tipe) filter expressions as 
         * one single tag.
         * 
         * Determines wheter this tag is the representative of the value of the filter
         * expression or just a single entry in an array value. In this case, value must be an array.
         * 
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} value
         * @returns {FilterExpression.CollectionTag}
         */
        FilterExpression.prototype.CollectionTag = function (filterExpression, value) {
            FilterExpression.prototype.Tag.call(this, filterExpression, value);
        };

        FilterExpression.prototype.CollectionTag.prototype = Object.create(FilterExpression.prototype.Tag.prototype);
        FilterExpression.prototype.CollectionTag.constructor = FilterExpression.prototype.CollectionTag;


        /**
         * Return the display value of a collection tag which 
         * is always the name (title) of the filter expression!
         * 
         * @returns {string} name of the filter expression (display value)
         */
        FilterExpression.prototype.CollectionTag.prototype.getDisplayValue = function () {
            return this.getTitle();
        };

        /**
         * If a Filter Expression is editable, a custom editor (property: editor) 
         * is shown when the user clicks on the Tag of the Filter Expression. 
         * 
         * @returns {Boolean} editable ot not
         */
        FilterExpression.prototype.CollectionTag.prototype.isEditable = function () {
            return this.origin.editor ? true : false;
        };

        /**
         * Determines the cardinality of a a collection tag. That is the number of 
         * of arry values (or tags) of the origin filter expression. 
         * 
         * @returns {int} cardinality of the collection tag
         */
        FilterExpression.prototype.CollectionTag.prototype.getCardinality = function () {
            return (this.origin.value && this.origin.isMultiple()) ? this.origin.value.length : 0;
        };

        /**
         * Removes the value represented by this tag from the filter expression.
         * Since a collection tag represents the whole array of an array-type filter 
         * expression, this method removes the filter expression value as a whole,
         * not just a single array element.
         * 
         * @returns {undefined}
         */
        FilterExpression.prototype.CollectionTag.prototype.remove = function () {
            // this empties the origin array, but the local copy (CollectionTag.value)
            // is still available for postprocessing in the callback function!
            this.origin.value = null;

            // invoke the callback function
            if (this.origin.removeCallBack) {
                this.origin.removeCallBack(this);
            }
        };

        /**
         * Returns the filter expression string of collection tag which is
         * eqaul to the filter expression of the origin filter expression
         * 
         * @returns expression for universal search
         */
        FilterExpression.prototype.CollectionTag.prototype.getFilterExpressionString = function () {
            return this.origin.getFilterExpressionString();
        };

        /**
         * Creates an new instace of a post filter tag. 
         * 
         * @constructor
         * @param {type} filterExpression
         * @param {type} value
         * @returns {FilterExpression.PostFilterTag}
         */
        FilterExpression.prototype.PostFilterTag = function (filterExpression, value) {
            if (!value && !value.hasOwnProperty('key') && !value.hasOwnProperty('value')) {
                throw 'The value of the PostFilterTag for the filter expression "' + filterExpression + '" is not valid! {key:..., value:...} object expected!';
            }

            FilterExpression.prototype.Tag.call(this, filterExpression, value);
            this.cardinality = (value && value.hasOwnProperty('value')) ? parseInt(value.value, 10) : 0;
            this.cardinality = isNaN(this.cardinality) ? 0 : this.cardinality;
        };

        FilterExpression.prototype.PostFilterTag.prototype = Object.create(FilterExpression.prototype.Tag.prototype);
        FilterExpression.prototype.PostFilterTag.constructor = FilterExpression.prototype.PostFilterTag;

        /**
         * Determines wheter is post filter tag is removeable or not. A post filter tag 
         * is not removeable if it's removal would lead  to an empty search result. This
         * is the case if the tag is the last tag in the current category (origin filter expressions
         * value array) or if there is only one resource associated with the current tag (cardinality = 1).
         * 
         * @param {Number} threshold
         * @returns {boolean} true if removeable
         */
        FilterExpression.prototype.PostFilterTag.prototype.isRemoveable = function (threshold) {
            return (this.origin.value.length > 1 && this.getCardinality() > 0 &&
                (threshold ? this.getCardinality() < threshold : true));
        };

        /**
         * Returns the cardinality of a post filter tag. The cardinality is stored in
         * the tag's value object in the value property.
         * @returns {Number} cardinality of the tag (number of resources assocated with the tag)
         */
        FilterExpression.prototype.PostFilterTag.prototype.getCardinality = function () {
            return this.cardinality;
        };

        /**
         * Returs the value of the post filter tag which is the key of the 
         * value/cardinality object.
         * 
         * @returns {String}
         */
        FilterExpression.prototype.PostFilterTag.prototype.getValue = function () {
            return this.value.key;
        };

        // define constants

        FilterExpression.FILTER_EXPRESSION_PATTERNS = /(!?[A-Za-z_\-]+?:"[\s\S]+?["]{1})+/g;
        FilterExpression.FILTER_EXPRESSION_PATTERN = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

        FilterExpression.FILTER__GEO = 'geo';
        FilterExpression.FILTER__GEO_INTERSECTS = 'geo-intersects';
        FilterExpression.FILTER__GEO_BUFFER = 'geo-buffer';
        FilterExpression.FILTER__KEYWORD = 'keyword';
        FilterExpression.FILTER__KEYWORD_XCUAHSI = 'keyword-x-cuahsi';
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
        FilterExpression.FILTER__RESOURE_TYPE = 'resource-type';

        FilterExpression.FILTERS = [
            FilterExpression.FILTER__GEO,
            FilterExpression.FILTER__GEO_INTERSECTS,
            FilterExpression.FILTER__GEO_BUFFER,
            FilterExpression.FILTER__KEYWORD,
            FilterExpression.FILTER__KEYWORD_XCUAHSI,
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
            FilterExpression.FILTER__PROTOCOL,
            FilterExpression.FILTER__RESOURE_TYPE
        ];

        Object.defineProperties(FilterExpression.prototype, {
            'valid': {
                'get': function () {
                    return this.isValid();
                }
            }
        });

        FilterExpression.prototype.constructor = FilterExpression;
        return FilterExpression;
    }]);

