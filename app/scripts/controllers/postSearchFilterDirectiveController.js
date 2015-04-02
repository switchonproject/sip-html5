angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        function ($scope, FilterExpression, AppConfig) {
            'use strict';
            var tempFilterExpressions, tempFilterExpression, removePostFilterTagFunction,
                removePostSearchFiltersFilterTag, setPostSearchFilterTags, pattern,
                setPostSearchFilterTagValue, removeNegatedSearchFilterTag;

            $scope.config = AppConfig.postSearchFilter;
            pattern = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

            // this is the USB filter expression that contains all post search filter expressions
            // that have been selected by the user.
            tempFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__POST_SEARCH_FILTERS);
            if (tempFilterExpressions && tempFilterExpressions.length > 0) {
                $scope.postSearchFiltersFilterExpression = tempFilterExpressions[0];
            } else {
                //console.warn('post search filters filter expression not correctly initialized!');
                $scope.postSearchFiltersFilterExpression = new FilterExpression(FilterExpression.FILTER__POST_SEARCH_FILTERS,
                    [], true, true, null, 'POST FILTERS', 'POST FILTERS', 'POST FILTERS');
                $scope.postSearchFiltersFilterExpression.getDisplayValue = function (value) {
                    this.displayValue = value;
                    return '';
                };
                $scope.filterExpressions.addFilterExpression($scope.postSearchFiltersFilterExpression);
            }

            // create default negated filter expressions that can be populated by post filter expressions
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
             * list of visual list of post search filter tags can be safely 
             * rebuilded completely.
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
                    // the negated filter tag that was added to USB (an was removed now) 
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
             * X icon of the tag. In contrast to ordinary search filter tags which
             * are simply removed from thier parent filter expression by calling 
             * the tag.remove() function, this callback function that is applied
             * to post search filter tags initiates a new search (if configured) wherby the removed
             * post search filter tag is excluded from the search result by adding it
             * as negated search parameter to the universal search string.
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

                        // add the respctive callback function that re-adds the
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

                    if ($scope.config.performImplicitSearch === true) {
                        // angular wrapped function, which is actually a getter for the real function
                        $scope.performSearch()(0, false);
                    }
                }
            };

            // create the tag list
            $scope.$watch('filterTags', function (filterTags, o) {
                if (filterTags && filterTags !== o && filterTags.length > 0) {
                    setPostSearchFilterTags(filterTags);
                }
            });
        }
    ]
);
