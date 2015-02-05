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
).factory('FilterExpression', [ function () {
    'use strict';

    // Define the constructor function.
    function FilterExpression(parameter, defaultValue, multiple, renderer) {
        if (parameter === undefined || parameter === null) {
            throw 'The parameter property of a FilterExpression cannot be null!';
        }
        this.parameter = parameter;
        this.defaultValue = (defaultValue === undefined) ? null : defaultValue;
        this.value = this.defaultValue;
        this.displayValue = null;
        this.multiple = (multiple === undefined) ? false : multiple;
        this.renderer = (renderer === undefined) ? this.RENDERER__TO_STRING : renderer;

        // define methods that may be overriden by object instance
        this.getDisplayValue = function () {
            return this.displayValue || this.value;
        };

        this.isValid = function () {
            if (this.multiple === true) {
                return (this.value && this.value.constructor === Array && this.value.length > 0);
            }

            return this.value ? true : false;
        };
    }

    // Define the common methods using the prototype
    // and standard prototypal inheritance.  
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

    // define constants
    FilterExpression.RENDERER__TO_STRING = 'renderer_tostring';

    return FilterExpression;
}]);

