angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.categoriesDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService, FilterExpression) {
            'use strict';

            var collectionFilterExpressions, topicFilterExpressions;

            // avoid scope soup in ng repeat
            this.expanded = false;
            this.selectedCategory = null;

            collectionFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__COLLECTION);
            if (!collectionFilterExpressions || collectionFilterExpressions.length === 0) {
                console.warn('collection Filter Expressions not correctly initilaized');
                $scope.filterExpressions.addFilterExpression($scope.collectionFilterExpression);
            }

            topicFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TOPIC);
            if (!topicFilterExpressions && topicFilterExpressions.length === 0) {
                console.warn('topic Filter Expressions not correctly initilaized');
                $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);
            }

            this.getCategories = function (category) {
                return TagGroupService.getCategoryList(category);
            };

            this.performCategoriesSearch = function (selectedCategory, categoryValue) {
                $scope.filterExpressions.clear();

                switch (selectedCategory) {
                case 'topic-inspire':
                    $scope.topicFilterExpression.setStringValue(categoryValue);
                    break;
                case 'category-collection':
                    $scope.collectionFilterExpression.setStringValue(categoryValue);
                    break;
                default:
                    return;
                }

                $scope.performSearch()(0, false);
                this.expanded = false;
                this.selectedCategory = null;
            };
        }]
    );