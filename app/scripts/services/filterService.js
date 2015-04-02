angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.filterService',
    ['FilterExpression',
        'AppConfig',
        function (FilterExpression, AppConfig) {
            'use strict';

            var nodeCollection, nodeCollectionCopy, filteredNodes,
                setResultSetFunction, filterResultSetFunction, containsTag,
                filterNodeCollection, totalResources, pattern;

            pattern = AppConfig.filterExpressionPattern;

            /**
             * 
             * @param {type} objs
             * @returns {undefined}
             */
            setResultSetFunction = function (resultSet) {
                if (resultSet && resultSet.$collection) {
                    nodeCollection = resultSet.$collection;
                    nodeCollectionCopy = nodeCollection.slice();
                    filteredNodes = [];
                    totalResources = resultSet.$total;
                } else {
                    nodeCollection = [];
                    nodeCollectionCopy = [];
                    filteredNodes = [];
                    totalResources = 0;
                }
            };

            filterResultSetFunction = function (filterExpression) {
                var i, filterExpressionString, param, value;
                if (filterExpression && filterExpression.isValid()) {
                    // reset!
                    filteredNodes = [];
                    if (filterExpression.parameter === FilterExpression.FILTER__POST_SEARCH_FILTERS) {
                        for (i = 0; i < filterExpression.value.length; ++i) {
                            // post search filters are an array of negated filter expressions!
                            filterExpressionString = filterExpression.value[i].split(pattern);
                            param = filterExpressionString[1];
                            value = filterExpressionString[2];

                            if (param && value) {
                                // filter expression is negated but the tag group name not!
                                param = param.indexOf('!') === 0 ? param.substr(1) : param;
                                filterNodeCollection(param, value);
                            }
                        }
                    } else {
                        // most likely a negated filter expression!
                        param = filterExpression.parameter.indexOf('!') === 0 ?
                                filterExpression.parameter.substr(1) : filterExpression.parameter;

                        if (filterExpression.isMultiple()) {
                            for (i = 0; i < filterExpression.value.length; ++i) {
                                filterNodeCollection(param, value[i]);
                            }
                        } else {
                            filterNodeCollection(param, value);
                        }
                    }
                } else if (filteredNodes.length > 0 || nodeCollectionCopy.length > nodeCollection.length) {
                    // filter expressions have been removed completely
                    // but filters were applied. reset them all!
                    for (i = 0; i < nodeCollectionCopy.length; ++i) {
                        if (nodeCollection.indexOf(nodeCollectionCopy[i]) === -1) {
                            nodeCollection.push(nodeCollectionCopy[i]);
                        }
                    }

                    if (nodeCollectionCopy.length === nodeCollection.length) {
                        filteredNodes = [];
                    } else {
                        console.error('cannot reset ' + filteredNodes.length + ' post search filters');
                    }
                }
            };

            filterNodeCollection = function (taggroup, tagname) {
                var i, j, node;
                if (nodeCollectionCopy && nodeCollectionCopy.length > 0 &&
                        nodeCollection && nodeCollection.length > 0) {
                    for (i = nodeCollectionCopy.length - 1; i >= 0; --i) {
                        node = nodeCollectionCopy[i];
                        j = nodeCollection.indexOf(node);
                        // omit node properties, start directly with object
                        if (containsTag(null, node.object, taggroup, tagname)) {
                            // filter can be applied to node!
                            // remove the node if it is not already removed
                            if (j !== -1) {
                                filteredNodes.push(node);
                                nodeCollection.splice(j, 1);
                            }
                        } else {
                            // the node is not in the list
                            if (j === -1) {
                                // and it is not filtered!
                                if (filteredNodes.indexOf(node) === -1) {
                                    // the user just removed the post search filter from USB again
                                    // re-add it to the displyed results 
                                    nodeCollection.push(j, nodeCollectionCopy[i]);
                                }
                            }
                        }
                    }
                }
            };

            containsTag = function (parentObject, childObject, taggroup, tagname) {
                var propertyName, propertyValue;
                if (parentObject && childObject && childObject.hasOwnProperty('taggroup')) {
                    // we found a tag. check  group and value
                    if (childObject.taggroup.name === taggroup && childObject.name === tagname) {
                        return true;
                    }
                } else if (childObject && typeof childObject === 'object') {
                    // object is not a tag. iterate sub objects
                    for (propertyName in childObject) {
                        if (childObject.hasOwnProperty(propertyName)) {
                            propertyValue = childObject[propertyName];
                            if (propertyValue && typeof childObject === 'object') {
                                if (containsTag(childObject, propertyValue, taggroup, tagname)) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                return false;
            };


            return {
                setResultSet: setResultSetFunction,
                getTotalResourcesNumber: function () { return totalResources; },
                getFilteredResourcesNumber: function () { return filteredNodes.length; },
                getLoadedResourcesNumber: function () { return nodeCollectionCopy.length; },
                isCompleteResult: function () { return nodeCollectionCopy && nodeCollectionCopy.length > 0 && nodeCollectionCopy.length ===  totalResources; },
                filterResultSet: filterResultSetFunction
            };
        }
    ]
);