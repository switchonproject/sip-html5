angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.filterService',
    ['FilterExpression',
        'AppConfig',
        function (FilterExpression, AppConfig) {
            'use strict';

            var nodeCollection, nodeCollectionCopy,
                setResultSetFunction, filterResultSetFunction, containsTag,
                filterNodeCollection, totalResources, pattern, parameterToTaggroup,
                taggroups, filterTags, filterTagsCopy, updateFilterTags;

            pattern = AppConfig.filterExpressionPattern;

            // TODO: those are the default taggroups used for filtering search results
            // they should be put to a separate Value Provider to allow 
            // per-application configuration of post search filters
            taggroups = {};
            taggroups[FilterExpression.FILTER__ACCESS_CONDITION] = 'access conditions';
            taggroups[FilterExpression.FILTER__KEYWORD_CUAHSI] = 'keywords - cuahsi';
            taggroups[FilterExpression.FILTER__KEYWORD] = 'keywords - free';
            taggroups[FilterExpression.FILTER__PROTOCOL] = 'protocol';
            taggroups[FilterExpression.FILTER__FUNCTION] = 'function';
            taggroups[FilterExpression.FILTER__RESOURE_TYPE] = 'resource type';

            /**
             * Sets a complete server search result set including node collection 
             * and objects. The function creates a shallow copy of the results set
             * to be able to revoke applied filters.
             * 
             * @param {type} resultSet
             * @returns {undefined}
             */
            setResultSetFunction = function (resultSet) {
                if (resultSet && resultSet.$collection) {
                    nodeCollection = resultSet.$collection;
                    nodeCollectionCopy = nodeCollection.slice();
                    totalResources = resultSet.$total;
                } else {
                    nodeCollection = [];
                    nodeCollectionCopy = [];
                    totalResources = 0;
                }

                if (resultSet && resultSet.$filterTags) {
                    filterTags = resultSet.$filterTags;
                    filterTagsCopy = filterTags.slice();
                } else {
                    filterTags = [];
                    filterTagsCopy = [];
                }
            };

            /**
             * Filters a result set by the FilterExpression. Accepts either a
             * negated filter expression or a post search filters filter expression
             * wherby the post search filters filter expression consists of an array 
             * of negated filter expressions.
             * 
             * The filter is directly applied on the shared resultSet$collection
             * that is injected into the $scope of this service and other 
             * directives, e.g. the listViewDirective.
             * 
             * @param {FilterExpression} filterExpression FilterExpression used for filtering
             * @returns {undefined}
             */
            filterResultSetFunction = function (filterExpression) {
                var i, filterExpressionString, param, value;

                // reset node collection
                for (i = 0; i < nodeCollectionCopy.length; ++i) {
                    if (nodeCollection.indexOf(nodeCollectionCopy[i]) === -1) {
                        nodeCollection.push(nodeCollectionCopy[i]);
                    }
                }

                // re-apply filters
                if (filterExpression && filterExpression.isValid()) {
                    if (filterExpression.parameter === FilterExpression.FILTER__POST_SEARCH_FILTERS) {
                        for (i = 0; i < filterExpression.value.length; ++i) {
                            // post search filters are an array of negated filter expressions!
                            filterExpressionString = filterExpression.value[i].split(pattern);
                            param = filterExpressionString[1];
                            value = filterExpressionString[2];

                            if (param && value) {
                                // filter expression is negated but the tag group name not!
                                param = param.indexOf('!') === 0 ? param.substr(1) : param;
                                filterNodeCollection(parameterToTaggroup(param), value);
                            }
                        }
                    } else {
                        // most likely a negated filter expression!
                        param = filterExpression.parameter.indexOf('!') === 0 ?
                                filterExpression.parameter.substr(1) : filterExpression.parameter;

                        if (filterExpression.isMultiple()) {
                            for (i = 0; i < filterExpression.value.length; ++i) {
                                filterNodeCollection(parameterToTaggroup(param), value[i]);
                            }
                        } else {
                            filterNodeCollection(parameterToTaggroup(param), value);
                        }
                    }
                }
            };

            /**
             * Performs a mapping between a filter expression parameter
             * and a taggroup. In general filter expression parmameters
             * (e.g. 'access-condition') should directly map to taggroup names.
             * However, some data models use taggroup names that contain spaces, etc.
             * (like 'access conditions'), therfore a client-side mapping is necessary-
             * 
             * @param {string} param
             * @returns {string} taggroup mapped to parameter
             */
            parameterToTaggroup = function (param) {
                var taggroup;
                taggroup = taggroups[param];
                return taggroup || param;
            };

            /**
             * Helper method for filtering a collection of nodes by a tag belonging 
             * to a specific tag group.
             * 
             * @param {string} taggroup
             * @param {string} tagname
             * @returns {undefined}
             */
            filterNodeCollection = function (taggroup, tagname) {
                var i, j, node;

                if (nodeCollectionCopy && nodeCollection && nodeCollectionCopy.length > 0) {

                    for (i = 0; i < nodeCollectionCopy.length; i++) {
                        node = nodeCollectionCopy[i];
                        j = nodeCollection.indexOf(node);
                        // omit node properties, start directly with object
                        if (containsTag(null, node.object, taggroup, tagname)) {
                            // filter can be applied to node!
                            // remove the node if it is not already removed
                            //console.log('tag "' + tagname + '" of taggroup "' + taggroup + ' filtered in nodeCollection[' + nodeCollection.length + '] (total nodes:' + nodeCollectionCopy.length + ')');
                            if (j !== -1) {
                                //console.log('removing tag "' + tagname + '" of taggroup "' + taggroup + '" from nodeCollection[' + nodeCollection.length + '] (total nodes:' + nodeCollectionCopy.length + ') at position ' + j);
                                nodeCollection.splice(j, 1);
                            }
                        }
                    }
                    //
                    //FIXME: TEMP DISABLED, method not tested
                    //updateFilterTags();
                }
            };

            /**
             * Locally updates the array of post search filters and sets the cardinality
             * of the individual tags based on the locally filtered result set.
             * 
             * FIXME: This method is not tested nor currently used!
             * 
             * @returns {undefined}
             */
            updateFilterTags = function () {
                var i, j, k, filterGroup, tagGroupName, tagGroupTags,
                    node, tagName, cardinality;

                // restore
                filterTags = filterTagsCopy.slice();

                for (i = 0; i < filterTags.length; ++i) {
                    filterGroup = filterTags[i];
                    if (filterGroup && filterGroup.value && filterGroup.value.length > 0) {
                        // e.g. download or access-conditions
                        tagGroupName = filterGroup.key;
                        // tags belonging to the group, including their cardinality
                        tagGroupTags = filterGroup.value;

                        for (j = 0; j < tagGroupTags.length; j++) {
                            tagName = tagGroupTags[j].key;
                            cardinality = 0;

                            for (k = 0; k < nodeCollection.length; k++) {
                                node = nodeCollection[k];
                                if (containsTag(null, node.object, tagGroupName, tagName)) {
                                    cardinality++;
                                }
                            }

                            tagGroupTags[j].value = cardinality;
                        }
                    }
                }
            };

            /**
             * Helper method for tag-based filtering that checks whether an
             * (cids)object is associated with a tag of a specific tag group.
             * 
             * @param {object} parentObject
             * @param {object} childObject
             * @param {string} taggroup
             * @param {string} tagname
             * @returns {Boolean} true if the child object contains the tag
             */
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
                getFilteredResourcesNumber: function () { return nodeCollectionCopy.length - nodeCollection.length; },
                getLoadedResourcesNumber: function () { return nodeCollectionCopy.length; },
                isCompleteResult: function () { return nodeCollectionCopy && nodeCollectionCopy.length > 0 && nodeCollectionCopy.length ===  totalResources; },
                filterResultSet: filterResultSetFunction
            };
        }
    ]
);