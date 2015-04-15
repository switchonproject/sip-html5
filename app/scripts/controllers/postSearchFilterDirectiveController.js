angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        'eu.water-switch-on.sip.services.filterService',
        function ($scope, FilterExpression, AppConfig, filterService) {
            'use strict';
            var tempFilterExpressions, tempFilterExpression, removePostFilterTagFunction,
                removePostSearchFiltersFilterTag, setPostSearchFilterTags, pattern,
                setPostSearchFilterTagValue, removeNegatedSearchFilterTag;

            $scope.config = AppConfig.postSearchFilter;
            pattern = AppConfig.filterExpressionPattern;

            // this is the USB filter expression that contains all post search filter expressions
            // that have been selected by the user.
            tempFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__POST_SEARCH_FILTERS);
            if (!tempFilterExpressions && tempFilterExpressions.length === 0) {
                console.warn('post search filters filter expression not correctly initialized!');
                $scope.filterExpressions.addFilterExpression($scope.postSearchFiltersFilterExpression);
            }

            // create default negated filter expressions that can be populated by post filter expressions
            // TODO: Move to a value Provider to allow per-application configuration of post search filters
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__ACCESS_CONDITION),
                [], true, true, null, 'Access Condition (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__FUNCTION),
                [], true, true, null, 'Access Function (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__PROTOCOL),
//                [], true, true, null, 'Access Protocol (Excluded)');
//            $scope.filterExpressions.addFilterExpression(tempFilterExpression);
//
//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__KEYWORD_CUAHSI),
//                [], true, true, null, 'CUAHSI Keyword (Excluded)');
//            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            // those are the actual search-result-dependent post filter expressions 
            // that can be selected by the user. 
            // TODO: Move to a value Provider to allow per-application configuration of post search filters
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__ACCESS_CONDITION),
                [], true, true, null, 'Access Conditions');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__FUNCTION),
                [], true, true, null, 'Access Functions');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__PROTOCOL),
//                [], true, true, null, 'Access Protocols');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);
//
//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__KEYWORD_CUAHSI),
//                [], true, true, null, 'CUAHSI Keywords');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

//            tempFilterExpression = new FilterExpression(('!'+FilterExpression.FILTER__KEYWORD), 
//                [], true, true, null, 'Keywords');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            /**
             * Creates the actual visual tags from an array of tag/cardinality
             * entries.
             * 
             * @param {type} filterTags
             * @returns {undefined}
             */
            setPostSearchFilterTags = function (filterTags) {
                $scope.postSearchFilterExpressions.clear();
                var i, filterExpression, filterExpressions, tagGroup, param, j;

                if (!filterTags || filterTags.length === 0) {
                    return;
                }

                for (i = 0; i < filterTags.length; ++i) {
                    tagGroup = filterTags[i];
                    if (tagGroup && tagGroup.value && tagGroup.value.length > 0) {
                        param = '!' + tagGroup.key;
                        filterExpressions = $scope.postSearchFilterExpressions.getFilterExpressionsByType(param);
                        if (!filterExpressions || filterExpressions.length === 0) {
                            filterExpression = new FilterExpression(param, null, true);
                            $scope.postSearchFilterExpressions.addFilterExpression(filterExpression);
                        } else {
                            filterExpression = filterExpressions[0];
                        }

                        // make a copy of the array in order to be able to restore the values!
                        filterExpression.value = [];
                        for (j = 0; j < tagGroup.value.length; ++j) {
                            filterExpression.value.push(tagGroup.value[j]);
                        }

                        if (!filterExpression.removeCallBack) {
                            filterExpression.removeCallBack = removePostFilterTagFunction;
                        }

                        // enumerate tags as post filter tags explicitely!
                        filterExpression.enumeratedTags = filterExpression.enumerateTags(true);
                    }
                }
            };

            /**
             * This is the remove callback function that is called after the *grouped
             * USB filter expression* that contains all post search filter expressions
             * that have been selected by the user is removed. (this makes only sense when
             * performImplicitSearch is false). The post search filter that is removed from
             * the USB is re-added to the list of visual post search filter tags!
             * 
             * @param {FilterExpression.Tag} postSearchFiltersFilterTag negated tag drom usb
             * @returns {undefined}
             */
            removePostSearchFiltersFilterTag = function (postSearchFiltersFilterTag) {
                if (postSearchFiltersFilterTag &&
                        postSearchFiltersFilterTag instanceof FilterExpression.prototype.CollectionTag) {
                    // the postSearchFiltersFilterExpression was removed from USB as a whole.
                    // rebuild the complete list of post search filter tags!
                    setPostSearchFilterTags($scope.filterTags);
                } else if (postSearchFiltersFilterTag) {
                    setPostSearchFilterTagValue(postSearchFiltersFilterTag.getValue());
                }
            };

            /**
             * Applied post search filters can either be grouped in USB or added as
             * distinct negated filter expression (configurable via the option 
             * config.groupPostSearchFilters option). This callback operation is 
             * used in  later case and re-adds a negated filter tag upon its removal from
             * USB to the list of post filter tags.
             * 
             * @param {FilterExpression.Tag} negatedFilterTag
             * @returns {undefined}
             */
            removeNegatedSearchFilterTag = function (negatedFilterTag) {
                var negatedFilterExpressions, negatedFilterExpression, i;
                if (negatedFilterTag &&
                        negatedFilterTag instanceof FilterExpression.prototype.CollectionTag) {
                    // array of negated filter expressions
                    negatedFilterExpressions = negatedFilterTag.getValue();
                    for (i = 0; i < negatedFilterExpressions.length; ++i) {
                        // why can't we just call negatedFilterTag.getFilterExpressionString()?
                        // because the removeNegatedSearchFilterTag callback function is called after removal of the
                        // tag value from the origin filter expression. Thus, the array of
                        // the origin filter expression is already empty. We have to reconstruct
                        // the negated expressions.
                        negatedFilterExpression = negatedFilterTag.origin.concatFilter(negatedFilterTag.origin.parameter, negatedFilterExpressions[i]);
                        setPostSearchFilterTagValue(negatedFilterExpression);
                    }
                } else if (negatedFilterTag) {
                    // same here. value already removed from origin, so we have to use the 
                    // copy of the (array) value in the tag.
                    setPostSearchFilterTagValue(negatedFilterTag.origin.concatFilter(negatedFilterTag.origin.parameter, negatedFilterTag.getValue()));
                }
            };

            // add the remove callback function to the grouped post filter tags
            if (!$scope.postSearchFiltersFilterExpression.removeCallBack) {
                $scope.postSearchFiltersFilterExpression.removeCallBack = removePostSearchFiltersFilterTag;
            }

            /**
             * Re-creates a previously removed PostSearchFilterTag from a
             * negated filter expression. This method is called when only one tag of 
             * the postSearchFiltersFilterExpression collection was removed from USB. 
             * If the whole postSearchFiltersFilterExpression is removed, the 
             * list of visual of post search filter tags can be safely 
             * rebuilt completely. (CollectionTag)
             * 
             * @param {String} negatedFilterExpression negated tag from USB
             * @returns {undefined}
             */
            setPostSearchFilterTagValue = function (negatedFilterExpression) {
                var filterExpressions, filterExpression, filterExpressionString,
                    param, i, j, value, tagGroup;

                // split negated filter expression, e.g. '!access-condition:no limitation'
                filterExpressionString = negatedFilterExpression.split(pattern);
                param = filterExpressionString[1];
                value = filterExpressionString[2];

                if (param && value) {
                    // the negated filter tag that was added to USB (and was removed now) 
                    // looses the information on cardinality. Therfore we have to 
                    // find the original value in the list of tags retrieved from the server
                    for (i = 0; i < $scope.filterTags.length; ++i) {
                        tagGroup = $scope.filterTags[i];
                        // find the type, e.g. '!access-condition'
                        if (tagGroup && tagGroup.value && tagGroup.value.length > 0 &&
                                param === ('!' + tagGroup.key)) {
                            // now we have to find the original value that contains besides 
                            // the name (e.g. 'no limitation') also the cardinality!
                            for (j = 0; j < tagGroup.value.length; ++j) {
                                if (tagGroup.value[j].key === value) {
                                    // we found the tag value (e.g. 'no limitation'),
                                    // now find the respective postSearchFilterExpression
                                    filterExpressions = $scope.postSearchFilterExpressions.getFilterExpressionsByType(param);
                                    if (filterExpressions && filterExpressions.length > 0) {
                                        filterExpression = filterExpressions[0];
                                        // set the value that invludes also the cardinality.
                                        if (filterExpression.setArrayValue(tagGroup.value[j])) {
                                            // manually update the visual tag list
                                            filterExpression.enumeratedTags = filterExpression.enumerateTags(true);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            /**
             * This is the function that is called when the user clicks on the
             * X icon of the post filtrer tag. In contrast to ordinary search filter tags which
             * are simply removed from their parent filter expression by calling 
             * the tag.remove() function, this callback function that is applied
             * to post search filter tags initiates a new search (if configured) wherby the removed
             * post search filter tag is excluded from the search result by adding it
             * as negated search parameter to the universal search string.
             * 
             * Wheter implict search is performed after removing the tag is configurable
             * via the config.performImplicitSearch parameter.
             * 
             * If a local complete result is available on the client (no paging needed),
             * the filters can be directly applied on the local result result. However,
             * this is not  performed directly in this method, but by watching the 
             * post search filters filter expression that is shown in USB. 
             * 
             * @param {FilterExpression.Tag} tag visual post filter tag
             * 
             */
            removePostFilterTagFunction = function (tag) {
                if (tag) {
                    var filterExpressions, filterExpression, filterExpressionString,
                        offsetFilterExpressions, offsetFilterExpression;

                    // insted of adding separate negated filter expressions to USB,
                    // create one grouped post filter expression
                    if ($scope.config.groupPostSearchFilters === true) {
                        filterExpressionString = tag.getFilterExpressionString();
                        $scope.postSearchFiltersFilterExpression.setArrayValue(filterExpressionString);
                    } else {
                        filterExpressions = $scope.filterExpressions.getFilterExpressionsByType(tag.getType());
                        if (!filterExpressions || filterExpressions.length === 0) {
                            filterExpression = new FilterExpression(tag.getType(), null, true);
                            $scope.filterExpressions.addFilterExpression(filterExpression);
                        } else {
                            filterExpression = filterExpressions[0];
                        }
                        filterExpression.setArrayValue(tag.getValue());

                        // add the respective callback function that re-adds the
                        // post filter upon its removel from USB
                        if (!filterExpression.removeCallBack) {
                            filterExpression.removeCallBack = removeNegatedSearchFilterTag;
                        }
                    }

                    // reset offset! Any change to the universal search string breaks the previous offset
                    offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_OFFSET);
                    if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                        offsetFilterExpression = offsetFilterExpressions[0];
                        offsetFilterExpression.value = 0;
                    }

                    // manually update the tag list
                    tag.origin.enumeratedTags = tag.origin.enumerateTags(true);

                    // apply implict search only if it is enabled in config,
                    // and if the filters cannot be applied locally
                    if ($scope.config.performImplicitSearch === true &&
                            (filterService.isCompleteResult() === false ||
                            $scope.config.applyFilterLocally === false)) {
                        // angular wrapped function, which is actually a getter for the real function
                        $scope.performSearch()(0, false);
                    }
                }
            };

            /**
             * Watch the combined postSearchFiltersFilter that are shown in USB.
             * Apply the filters locally, if we got a complete search result on the client.
             */
            $scope.$watch('postSearchFiltersFilterExpression.value', function (o, n) {
                if ($scope.config.applyFilterLocally === true &&
                        filterService.isCompleteResult() === true && o !== n) {
                    filterService.filterResultSet($scope.postSearchFiltersFilterExpression);

                    // update the remove threshold of post filter tags to reflect
                    // the new size of the filtered result set.
                    $scope.removeThreshold = filterService.getLoadedResourcesNumber() - filterService.getFilteredResourcesNumber();

                    if ($scope.notificationFunction) {
                        if (filterService.getFilteredResourcesNumber() > 0) {
                            $scope.notificationFunction()(filterService.getFilteredResourcesNumber() + ' of ' +
                                        filterService.getLoadedResourcesNumber() +
                                        ' resources hidded by filter.', 'warning');
                        } else {
                            $scope.notificationFunction()('Showing ' + filterService.getLoadedResourcesNumber() +
                                    ' of ' + filterService.getTotalResourcesNumber() +
                                    ' resources', 'success');
                        }
                    }
                }
            }, true);

            /**
             * When the filterable tags are updated, rebuild the visualised 
             * post search filter tags.
             * 
             * Filterable tags are updated when a) a new search has been performed 
             * and the filterable tags that apply to the current search result are 
             * retrieved from the server, or, b) when a post search filter is applied
             * on the local complete search result.
             */
            $scope.$watch('filterTags', function (filterTags, o) {
                if (filterTags && filterTags !== o && filterTags.length > 0) {
                    setPostSearchFilterTags(filterTags);
                }
            });
        }
    ]
);
